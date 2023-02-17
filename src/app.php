<?php
use Pecee\SimpleRouter\SimpleRouter;
use GuzzleHttp\Client;

require 'routes.php';

SimpleRouter::setDefaultNamespace('\Demo\Controllers');
SimpleRouter::start();