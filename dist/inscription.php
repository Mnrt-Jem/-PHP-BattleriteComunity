<?php include "assets/include/header.php" ?>
<?php include "recaptcha/autoload.php" ?>
<?php
if (isset($_POST['g-recaptcha-response'])) {
    $recaptcha = new \ReCaptcha\ReCaptcha('6LdBBScUAAAAADrX7e1PGV_8FyLkcZqhVX0a0bLh');
    $resp = $recaptcha->verify($_POST['g-recaptcha-response']);
    if ($resp->isSuccess()) {
    }
    else {
        $errors = $resp->getErrorCodes();
    } 
} ?>


<?php 
    if(isset($_POST['form_inscription']))
    {
        if(!empty($_POST['pseudo']) and !empty($_POST['email']) and !empty($_POST['pwd']) and !empty($_POST['cpwd']))
        {
            $pseudo= htmlspecialchars($_POST['pseudo']);
            $email= htmlspecialchars($_POST['email']);
            $pwd= sha1($_POST['pwd']);
            $cpwd= sha1($_POST['cpwd']);

            $pseudolength= strlen($pseudo);
            if($pseudolength <= 30)
            {
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) 
                {
                    $requete0=$con->prepare('SELECT * FROM utilisateur Where mail = :email');
                    $requete0 -> bindParam(':email',$email);
                    $requete0 ->execute();
                    $mailexist = $requete0->rowCount();
                    if ($mailexist == 0)
                    {
                        if ($pwd == $cpwd)
                        {
                            $requete=$con->prepare('INSERT INTO utilisateur (pseudo, mail, mdp) VALUES (:pseudo, :email, :mdp)');
                            $requete -> bindParam(':pseudo',$pseudo);
                            $requete -> bindParam(':email',$email);
                            $requete -> bindParam(':mdp',$pwd);
                            $requete ->execute();
                            echo '<meta http-equiv="refresh" content="0;URL=index.php">';
                            }
                            else
                            {
                                echo '<body onLoad="alert(\'Vos mots de passes ne correspondent pas !\')">';
                                echo '<meta http-equiv="refresh" content="0;URL=inscription.php">';
                            }
                    }
                    else
                    {
                        echo '<body onLoad="alert(\'Cette adresse mail est déjà utilisée !\')">';
                        echo '<meta http-equiv="refresh" content="0;URL=inscription.php">';
                    }  
                }
                else
                {
                        echo '<body onLoad="alert(\'Votre adresse mail n\'est pas valide !\')">';
                        echo '<meta http-equiv="refresh" content="0;URL=inscription.php">';
                }

            }
            else
            {
                echo '<body onLoad="alert(\'Votre pseudo est trop grand !\')">';
                echo '<meta http-equiv="refresh" content="0;URL=inscription.php">';
            }
        }
        else
        {
            echo '<body onLoad="alert(\'Tous les champs doivent être complétés !\')">';
            echo '<meta http-equiv="refresh" content="0;URL=inscription.php">';
        }
    }
?>

    <div class="nk-main">

        <!-- START: Breadcrumbs -->
        <div class="nk-gap-1"></div>
        <div class="container">
            <ul class="nk-breadcrumbs">


                <li><a href="index.php">Home</a></li>


                <li>
                    <span class="fa fa-angle-right"></span>
                </li>

                <li><a href="">Connexion</a></li>

                <li>
                    <span>INSCRIPTION</span>
                </li>

            </ul>
        </div>
        <div class="nk-gap-1"></div>
        <!-- END: Breadcrumbs -->




        <div class="container">

            <div class="nk-store nk-store-checkout">
                <h3 class="nk-decorated-h-2">
                    <span>
                        <span class="text-main-1">Vos</span> Informations</span>
                </h3>

                <!-- START: Billing Details -->
                <div class="nk-gap"></div>
                <form method="POST" action="" class="nk-form">
                    <div class="row vertical-gap">
                        <div class="col-lg-6">
                            <div class="row vertical-gap">
                                <div class="col-sm-6">
                                    <label for="pseudo">PSEUDO
                                        <span class="text-main-1">*</span>:</label>
                                    <input type="text" class="form-control required" name="pseudo" id="pseudo">
                                </div>
                            </div>
                            <div class="nk-gap-1"></div>
                                    <label for="email">EMAIL
                                        <span class="text-main-1">*</span>:</label>
                                    <input type="email" class="form-control required" name="email" id="email">
                            <div class="nk-gap-1"></div>
                            <div class="row vertical-gap">
                                <div class="col-sm-6">
                                    <label for="pwd">PASSWORD
                                        <span class="text-main-1">*</span>:</label>
                                    <input type="password" class="form-control required" name="pwd" id="pwd">
                                </div>
                                <div class="col-sm-6">
                                    <label for="cpwd">CONFIRM PASSWORD
                                        <span class="text-main-1">*</span>:</label>
                                    <input type="password" class="form-control required" name="cpwd" id="cpwd">
                                </div>
                            </div>
                            <div class="nk-gap-1"></div>
                            <div class="g-recaptcha" data-sitekey="6LdBBScUAAAAAACwIZKiQjH6-tvtBAuJ_hU-RsDz"></div>
                             <div class="nk-gap-1"></div>
                        <input type="submit" value="INSCRIPTION" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_inscription">
                    </div>
                </form>
                <!-- END: Billing Details -->
            </div>
        </div>
        <div class="nk-gap-2"></div>
    </div>



        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>