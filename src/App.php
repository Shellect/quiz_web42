<?php

namespace Student\Quiz;

class App
{
    public function __construct() {}

    public function run() {
        $response = [
            'question' => 'Какое дерево становится мокрым после дождя?',
            'answers' => [
                'Берёза',
                'Ёлка',
                'Любое',
                'Дуб'
            ]
        ];
        echo json_encode($response);
    }
}
