<?php

namespace App\Exceptions;

use Illuminate\Foundation\Exceptions\Handler as ExceptionHandler;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Validation\ValidationException;
use Symfony\Component\HttpKernel\Exception\HttpException;
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
            return $this->handleApiException($e);
        });
    }

    /**
     * Handle API exceptions and always return JSON.
     */
    protected function handleApiException(Throwable $e): JsonResponse
    {
        if ($e instanceof ValidationException) {
            return response()->json([
                'message' => 'Validation failed',
                'errors' => $e->errors(),
            ], 422);
        }

        if ($e instanceof HttpException) {
            return response()->json([
                'message' => $e->getMessage() ?: 'HTTP Error',
            ], $e->getStatusCode());
        }

        $statusCode = method_exists($e, 'getStatusCode') ? $e->getStatusCode() : 500;

        $response = [
            'message' => $e->getMessage() ?: 'Server Error',
        ];

        if (config('app.debug')) {
            $response['exception'] = get_class($e);
            $response['file'] = $e->getFile();
            $response['line'] = $e->getLine();
            $response['trace'] = collect($e->getTrace())->take(10)->toArray();
        }

        return response()->json($response, $statusCode);
    }
}
