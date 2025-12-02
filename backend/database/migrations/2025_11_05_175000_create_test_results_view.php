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
        DB::statement("
            CREATE VIEW test_results AS 
            SELECT 
                u.id AS user_id,
                u.username,
                c.id AS category_id,
                c.category_name,
                COUNT(q.id) AS questions_answered,
                SUM(qo.is_correct) AS scores,
                ROUND(
                    IF(
                        COUNT(q.id) > 0, 
                        SUM(qo.is_correct) * 100.0 / COUNT(q.id),
                        0
                    )
                , 2) AS success_rate
            FROM users u
            CROSS JOIN categories c
            INNER JOIN questions q ON c.id = q.category_id
            INNER JOIN user_answers ua ON u.id = ua.user_id AND q.id = ua.question_id
            INNER JOIN question_options qo ON ua.option_id = qo.id
            GROUP BY u.id, u.username, c.id, c.category_name
        ");
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        DB::statement('DROP VIEW IF EXISTS test_results');
    }
};

