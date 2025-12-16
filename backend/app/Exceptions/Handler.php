<?php

namespace App\Exceptions;

use Illuminate\Auth\AuthenticationException;
use Illuminate\Auth\Access\AuthorizationException;
use Illuminate\Database\Eloquent\ModelNotFoundException;
use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
use Symfony\Component\HttpKernel\Exception\NotFoundHttpException;
use Symfony\Component\HttpKernel\Exception\MethodNotAllowedHttpException;
use Throwable;

class Handler extends ExceptionHandler
{
    /**
     * The list of the inputs that are never flashed to the session on validation exceptions.
     *
     * @var array<int, string>
     */
    protected $dontFlash = [
        'current_password',
        'password',
        'password_confirmation',
    ];

    /**
     * Register the exception handling callbacks for the application.
     */
    public function register(): void
    {
        $this->renderable(function (Throwable $e, Request $request) {
            return $this->handleApiException($e, $request);
        });
    }

    protected function handleApiException(Throwable $e, Request $request): JsonResponse
    {
        $status = $this->getStatusCode($e);

        $problemDetails = [
            'title' => $this->getTitle($status),
            'status' => $status,
            'detail' => $this->getDetail($e),
            'instance' => $request->getPathInfo(),
        ];

        // Add validation errors
        if ($e instanceof ValidationException) {
            $problemDetails['errors'] = $e->errors();
        }

        // Add debug information in development
        if (config('app.debug') && $status >= 500) {
            $problemDetails['exception'] = [
                'type' => get_class($e),
                'message' => $e->getMessage(),
                'file' => $e->getFile(),
                'line' => $e->getLine(),
                'trace' => collect($e->getTrace())->take(10)->map(function ($frame) {
                    return [
                        'file' => $frame['file'] ?? null,
                        'line' => $frame['line'] ?? null,
                        'function' => ($frame['class'] ?? '') . ($frame['type'] ?? '') . ($frame['function'] ?? ''),
                    ];
                })->toArray(),
            ];
        }

        return new JsonResponse(
            $problemDetails,
            $status,
            ['Content-Type' => 'application/problem+json']
        );
    }

    /**
     * Get HTTP status code for exception.
     */
    protected function getStatusCode(Throwable $e): int
    {
        return match (true) {
            $e instanceof AuthenticationException => 401,
            $e instanceof AuthorizationException => 403,
            $e instanceof ModelNotFoundException,
            $e instanceof NotFoundHttpException => 404,
            $e instanceof MethodNotAllowedHttpException => 405,
            $e instanceof ValidationException => 422,
            $e instanceof HttpException => $e->getStatusCode(),
            default => 500,
        };
    }

    /**
     * Get human-readable title for status code.
     */
    protected function getTitle(int $status): string
    {
        return match ($status) {
            400 => 'Bad Request',
            401 => 'Unauthorized',
            403 => 'Forbidden',
            404 => 'Not Found',
            405 => 'Method Not Allowed',
            409 => 'Conflict',
            422 => 'Unprocessable Entity',
            429 => 'Too Many Requests',
            500 => 'Internal Server Error',
            502 => 'Bad Gateway',
            503 => 'Service Unavailable',
            default => 'Error',
        };
    }

    /**
     * Get detail message for exception.
     */
    protected function getDetail(Throwable $e): string
    {
        return match (true) {
            $e instanceof AuthenticationException => 'Authentication is required to access this resource.',
            $e instanceof AuthorizationException => 'You do not have permission to access this resource.',
            $e instanceof ModelNotFoundException => 'The requested resource was not found.',
            $e instanceof NotFoundHttpException => 'The requested endpoint does not exist.',
            $e instanceof MethodNotAllowedHttpException => 'The HTTP method is not allowed for this endpoint.',
            $e instanceof ValidationException => 'One or more validation errors occurred.',
            default => config('app.debug') ? $e->getMessage() : 'An unexpected error occurred.',
        };
    }
}
