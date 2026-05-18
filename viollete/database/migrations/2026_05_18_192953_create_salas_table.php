public function up(): void
{
    Schema::create('salas', function (Blueprint $table) {
        $table->id();
        $table->string('nome');
        $table->text('descricao')->nullable();
        $table->timestamps();
    });
}