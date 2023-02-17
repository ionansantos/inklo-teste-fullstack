<?php

namespace App;

use GuzzleHttp\Client;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Exception\RequestException;
use Pecee\SimpleRouter\SimpleRouter as Router;
use App\View;

class AppController {
  static public function index() {
    return View::send('index.html', true);
  }

  static public function store() {

    $entityBody = file_get_contents('php://input');

    $body = json_decode($entityBody, true);
    $login = $body["login"];

    if(!isset($login) || strlen($login) == 0) {
      $res = ['msg' => 'login não encontrado'];
      return Router::response()->httpCode(400)->json($res);
    }

    $client = new Client(['base_uri' => 'https://api.github.com/users/']);

    try {
        $response = $client->request('GET', $login);

        $responseBody = $response->getBody()->read(2048);

        $filename = $login.'.json';
        $file = fopen(__DIR__ . '/users/' . $filename,'w');
        fwrite($file, $responseBody);
        fclose($file);

        return;
    } catch (RequestException $e) {
        $res = ['msg' => 'Erro ao realizar a requisição para a API do GitHub'];
        return Router::response()->httpCode(500)->json($res);
    }
  }

  static public function login() {
    $query = Router::getUrl();
    $login = $query->getParam("login");

    $file = '../src/users/' . $login . '.json';
    if(file_exists($file)) {
      $json = require 'users/' . $login . '.json';
    } else {
      return Router::response()->httpCode(400)->json(['msg'=>'arquivo não encontrado.']);
    }
  }
}