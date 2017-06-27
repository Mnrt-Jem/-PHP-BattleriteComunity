<?php include "assets/include/header.php" ?>

<?php
    if (isset($_GET['id']) AND $_GET['id'] > 0)
    {
        $getid= intval($_GET['id']);
        $requete0=$con->prepare('SELECT * FROM utilisateur Where id_utilisateur = :id');
        $requete0 -> bindParam(':id',$getid);
        $requete0 ->execute();
        $userinfo = $requete0->fetch();

?>
<?php
    if(isset($_POST['form_maj']))
    {
        if(!empty($_POST['pseudo']) and !empty($_POST['email']) and !empty($_POST['bio']))
        {
            $pseudo= htmlspecialchars($_POST['pseudo']);
            $email= htmlspecialchars($_POST['email']);
            $bio= htmlspecialchars($_POST['bio']);
            $biolength= strlen($bio);
            if ($biolength <= 140) 
            {
                if (filter_var($email, FILTER_VALIDATE_EMAIL)) 
                {
                    $requete1=$con->prepare('SELECT * FROM utilisateur Where mail = :email');
                    $requete1 -> bindParam(':email',$email);
                    $requete1 ->execute();
                         $requete=$con->prepare('UPDATE utilisateur SET pseudo = :pseudo, mail = :email, biographie = :bio where id_utilisateur = '.$userinfo['id_utilisateur'].'');
                            $requete -> bindParam(':pseudo',$pseudo);
                            $requete -> bindParam(':email',$email);
                            $requete -> bindParam(':bio',$bio);
                            $requete ->execute();
                            echo '<meta http-equiv="refresh" content="0;URL=profile.php?id='.$userinfo['id_utilisateur'].'">';
                }
                else
                {
                    echo '<meta http-equiv="refresh" content="0;URL=profile.php?id='.$userinfo['id_utilisateur'].'">';
                }
            }
            else
            {
                echo '<meta http-equiv="refresh" content="0;URL=profile.php?id='.$userinfo['id_utilisateur'].'">';
            }
        }
        else
        {
            echo '<meta http-equiv="refresh" content="0;URL=profile.php?id='.$userinfo['id_utilisateur'].'">';
        }
    }
?>
<?php if (isset($_POST['form_mute']))
    {
    $mutedid = $_POST["id_mute"];
    $mute=$con->prepare('UPDATE utilisateur SET muted = 1 where id_utilisateur = :id_utilisateur');
    $mute-> bindParam(':id_utilisateur',$mutedid);
    $mute->execute();
    echo '<meta http-equiv="refresh" content="0;URL=profile.php?id='.$userinfo['id_utilisateur'].'">';
    } ?>
    <div class="nk-main">

        <!-- START: Breadcrumbs -->
        <div class="nk-gap-1"></div>
        <div class="container">
            <ul class="nk-breadcrumbs">


                <li><a href="index.php">Home</a></li>


                <li>
                    <span class="fa fa-angle-right"></span>
                </li>

                <li><a href="profile.php?id=<?php echo $_SESSION['id']?>">Profil</a></li>
                <?php if (isset($_SESSION['id']) AND $userinfo['rank'] == "admin") { ?>
                <li>
                    -<span class="fa fa-angle-right"></span>
                </li>
                <li><a href="admin.php">Administration</a></li>
                <?php }
                else {} ?>
                <li>
                    <span><?php echo $userinfo['pseudo']?></span>
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
                <?php if (isset($_SESSION['id']) AND $_SESSION['rank'] == "admin") { ?>
                    <form method="POST" action="" class="nk-form">
                        <div style="text-align: right;">
                        <input type="hidden" name="id_mute" value="<?php echo $getid ?>">
                            <input type="submit" value="MUTE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_mute">
                        </div>
                    </form>
                <?php } ?>
                <div style="text-align: center;">
                    <h3>RANK - <span class="text-main-1">Battlerite</span> Community</h3>
                    <img src="assets/images/<?php echo $userinfo['rank'] ?>.png" alt="rank">
                </div>
                <form method="POST" action="" class="nk-form">
                    <div class="row vertical-gap">
                        <div class="col-lg-6">
                            <div class="row vertical-gap">
                                <div class="col-sm-6">
                                    <label for="pseudo">PSEUDO :</label>
                                    <input type="text" class="form-control required" name="pseudo" id="pseudo" value="<?php echo $userinfo['pseudo'] ?>">
                                </div>
                            </div>
                            <div class="nk-gap-1"></div>
                                    <label for="email">EMAIL :</label>
                                    <input type="email" class="form-control required" name="email" id="email" value="<?php echo $userinfo['mail'] ?>">
                            <div class="nk-gap-1"></div>
                                <label for="notes">Biographie: <small>(140 caractères)</small></label>
                                <textarea class="form-control" name="bio" id="notes" placeholder="Bio ..." rows="6"><?php echo $userinfo['biographie'] ?></textarea>
                                <div class="nk-gap-1"></div>
                        <?php
                        if (isset($_SESSION['id']) AND $userinfo['id_utilisateur'] == $_SESSION['id'])
                        {
                        ?>
                            <input type="submit" value="METTRE A JOUR" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_maj">
                        <?php  
                        }
                        ?>
                </form>
                <!-- END: Billing Details -->

            </div>
        </div>
        <div class="nk-gap-2"></div>
    </div>
</div

<?php 
}
else
{
    
}

?>

        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>