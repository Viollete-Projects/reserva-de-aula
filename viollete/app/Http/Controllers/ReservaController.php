<?php

namespace App\Http\Controllers;

use App\Models\Reserva;
use Illuminate\Http\Request;

class ReservaController extends Controller
{
    public function index()
    {
        return Reserva::with(['user', 'sala'])->get();
    }

    public function store(Request $request)
    {
        $request->validate([
            'user_id' => 'required|exists:users,id',
            'sala_id' => 'required|exists:salas,id',
            'inicio' => 'required',
            'fim' => 'required',
        ]);

        return Reserva::create($request->all());
    }

    public function show($id)
    {
        return Reserva::with(['user', 'sala'])->findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $reserva = Reserva::findOrFail($id);
        $reserva->update($request->all());

        return $reserva;
    }

    public function destroy($id)
    {
        return Reserva::destroy($id);
    }
}