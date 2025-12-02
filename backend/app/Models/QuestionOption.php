<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class QuestionOption extends Model
{
    use HasFactory;

    protected $table = 'question_options';
    public $timestamps = false;

    protected $fillable = [
        'option_text',
        'is_correct',
        'question_id'
    ];

    protected $casts = [
        'is_correct' => 'boolean'
    ];

    public function question(): BelongsTo
    {
        return $this->belongsTo(Question::class);
    }
}
