<?php

if (!isset($_SESSION['id']) and isset($_COOKIE['email'],$_COOKIE['pwd']) and !empty($_COOKIE['email']) and !empty($_COOKIE['pwd'])) {
	
					$requete0=$con->prepare('SELECT * FROM utilisateur Where mail = :email and mdp = :pwd');
                    $requete0 -> bindParam(':email',$_COOKIE['email']);
                    $requete0 -> bindParam(':pwd',$_COOKIE['pwd']);
                    $requete0 ->execute();
                    $userexist = $requete0->rowCount();
                    if ($userexist == 1)
                    {
                        $userinfo = $requete0->fetch();
                        $_SESSION['id'] = $userinfo['id_utilisateur'];
                        $_SESSION['pseudo'] = $userinfo['pseudo'];
                        $_SESSION['mail'] = $userinfo['mail'];
                        $_SESSION['rank'] = $userinfo['rank'];
                    }

}
?>