<?php

namespace App\Http\Controllers;

use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class QuizController extends Controller
{
    public function getQuestionByNumber(Request $request): JsonResponse
    {
        $categoryID = $request->query('category');
        $questionNumber = $request->query('number');
        $options = DB::select('CALL get_question_by_number(?, ?)', [$categoryID, $questionNumber]);

        if (count($options) == 0) {
            $question = [];
        } else {
            $question = [
                'questionID' => $options[0]->question_id,
                'questionText' => $options[0]->question_text,
                'options' => array_map(fn($option) => [
                    'optionId' => $option->option_id,
                    'optionText' => $option->option_text
                ], $options)
            ];
        }
        
        return response()->json([
            'question' => $question
        ]);
    }
}
