<?php

use Illuminate\Support\Facades\Route;
use App\Http\Controllers\StudentController;
use App\Mail\sendMeM;
use Illuminate\Support\Facades\Mail;

/*
|--------------------------------------------------------------------------
| Web Routes
|--------------------------------------------------------------------------
|
| Here is where you can register web routes for your application. These
| routes are loaded by the RouteServiceProvider within a group which
| contains the "web" middleware group. Now create something great!
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::resource("/student", StudentController::class);

Auth::routes();

Route::get('/home', [App\Http\Controllers\HomeController::class, 'index'])->name('home');
Route::get('/change-password', [App\Http\Controllers\HomeController::class, 'changePassword'])->name('change-password');
Route::post('/update-password', [App\Http\Controllers\HomeController::class, 'updatePassword'])->name('update-password');

Route::get('send-email', function() {
  $mailData = [
      "name" => "Jane", 
      "dob" => "03/08/2000"
  ];

  Mail::to("hello@example.com")->sned(new mail($mailData));
  dd("Mail sent Successfully!");

});

