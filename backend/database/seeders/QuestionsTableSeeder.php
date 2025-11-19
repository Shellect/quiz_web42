<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\DB;

class QuestionsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        DB::table('questions')->insert([
            // Математика
            [
                'question_text' => 'Чему равно число π, с точностью до 2 знаков после запятой?',
                'category_id' => 1
            ],
            // История
            [
                'question_text' => 'В каком году началалсь Вторая мировая война?',
                'category_id' => 2
            ],
            // География
            [
                'question_text' => 'Какая река является самой длинной в мире?',
                'category_id' => 3
            ],
            // Биология
            [
                'question_text' => 'Сколько хромосом у здорового человека?',
                'category_id' => 4
            ],
            // Литература
            [
                'question_text' => 'Кто написал роман "Преступление и наказание"?',
                'category_id' => 5
            ],
            // Физика
            [
                'question_text' => 'Какова скорость света в вакууме?',
                'category_id' => 6
            ],
            // Химия
            [
                'question_text' => 'Какой химический элемент обозначается символом Au?',
                'category_id' => 7
            ],
            // Информатика
            [
                'question_text' => 'Что означает дескриптор <a> в HTML?',
                'category_id' => 8
            ],
            // Математика
            [
                'question_text' => 'Чему равен квадратный корень из 144?',
                'category_id' => 1
            ],
            // География
            [
                'question_text' => 'Какая страна имеет наибольшую площадь территории?',
                'category_id' => 3
            ]
        ]);
    }
}
