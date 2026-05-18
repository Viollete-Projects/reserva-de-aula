<?php

namespace App\Http\Controllers;

use App\Models\Sala;
use Illuminate\Http\Request;

class SalaController extends Controller
{
    public function index()
    {
        return Sala::all();
    }

    public function store(Request $request)
    {
        $request->validate([
            'nome' => 'required',
            'descricao' => 'nullable'
        ]);

        return Sala::create($request->all());
    }

    public function show($id)
    {
        return Sala::findOrFail($id);
    }

    public function update(Request $request, $id)
    {
        $sala = Sala::findOrFail($id);
        $sala->update($request->all());

        return $sala;
    }

    public function destroy($id)
    {
        return Sala::destroy($id);
    }
}