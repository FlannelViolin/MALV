<?php

echo "It works!";

error_reporting(E_ALL);
ini_set('display_errors',1);

$saveString = $_POST['save'];

$filename = "Saves.txt";
$file = fopen( $filename, "a+" );
if( $file == false )
{
   echo ( "Error in opening new file" );
   exit();
}
fwrite( $file, "\n" );
fwrite( $file, $saveString );
fclose( $file );
?>

