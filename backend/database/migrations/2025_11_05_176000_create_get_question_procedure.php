<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Support\Facades\DB;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        DB::unprepared("
            CREATE PROCEDURE get_question_by_number(IN category_id_param INT, IN question_num INT)
            READS SQL DATA
            DETERMINISTIC
            BEGIN
                WITH numbered_questions AS (
                    SELECT
                        id,
                        question_text,
                        category_id,
                        ROW_NUMBER() OVER (ORDER BY id) AS row_num
                    FROM questions
                    WHERE category_id = category_id_param
                ) SELECT
                    q.id AS question_id,
                    q.question_text,
                    qo.id AS option_id,
                    qo.option_text
                FROM numbered_questions q
                INNER JOIN question_options qo ON q.id = qo.question_id
                WHERE q.row_num = question_num
                ORDER BY qo.id;
            END
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::unprepared('DROP PROCEDURE IF EXISTS get_question_by_number');
    }
};

