<?php

use Pecee\SimpleRouter\SimpleRouter as Router;
use Pecee\Http\Request;
use Pecee\Http\Exceptions;
use App\AppController;
use App\View;

Router::get('/', [AppController::class, 'index']);
Router::post('/salvar-local', [AppController::class, 'store']);
Router::get('/login', [AppController::class, 'login']);

Router::get('/not-found', function () {
  Router::response()->httpCode(HTTP_NOT_FOUND);
  return View::send('404.html');
});

Router::get('/forbidden', function () {
  Router::response()->httpCode(HTTP_FORBIDDEN);
  return View::send('others.html');
});

// Função de erro para lidar com exceções
Router::error(function(Request $request, \Exception $exception) {

  switch($exception->getCode()) {
      case HTTP_NOT_FOUND:
        Router::response()->redirect('/not-found');
        break;
      case HTTP_FORBIDDEN:
        Router::response()->redirect('/forbidden');
        break;
      default:
        // Caso padrão para lidar com exceções com outros códigos
        Router::response()->httpCode(HTTP_INTERNAL_SERVER_ERROR);
        return View::send('error.html');
        break;
  }
});
