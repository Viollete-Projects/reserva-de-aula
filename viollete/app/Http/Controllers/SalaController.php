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
        return Sala::create($request->all());
    }
}