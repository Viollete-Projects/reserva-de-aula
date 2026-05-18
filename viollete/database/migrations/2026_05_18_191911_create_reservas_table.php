public function up(): void
{
    Schema::create('reservas', function (Blueprint $table) {
        $table->id();

        $table->foreignId('user_id')->constrained()->onDelete('cascade');
        $table->foreignId('sala_id')->constrained()->onDelete('cascade');

        $table->dateTime('inicio');
        $table->dateTime('fim');

        $table->timestamps();
    });
}