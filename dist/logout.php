<?php

session_start ();

setcookie('email', '',time()-3600);

setcookie('pwd', '',time()-3600);

session_unset ();

session_destroy ();

header ('location: index.php');
?>