<?php

echo "It works!";

//$saveString = $_POST['save'];

$filename = "test.txt";
$file = fopen( $filename, "w" );
if( $file == false )
{
   echo ( "Error in opening new file" );
   exit();
}
fwrite( $file, $saveString );
fclose( $file );
?>

