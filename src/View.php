<?php
namespace App;

class View {
  static public function send($file, $main=null) {
    $path = ($main ? __DIR__ . '/../public/app/' : __DIR__ . '/../public/') . $file;
    if(file_exists($path)) {
      require $path;
    } else {
      throw new \InvalidArgumentException("O arquivo '$file' não existe");
    }
  }
}
