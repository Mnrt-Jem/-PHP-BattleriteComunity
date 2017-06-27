<?php include "assets/include/header.php" ?>
<?php
$joueur1=$con->prepare('SELECT * FROM utilisateur WHERE id_utilisateur NOT IN (SELECT id_player_1 FROM team UNION SELECT id_player_2 FROM team UNION SELECT id_player_3 FROM team)');
$joueur1->execute();

$joueur2=$con->prepare('SELECT * FROM utilisateur WHERE id_utilisateur NOT IN (SELECT id_player_1 FROM team UNION SELECT id_player_2 FROM team UNION SELECT id_player_3 FROM team)');
$joueur2->execute();

$joueur3=$con->prepare('SELECT * FROM utilisateur WHERE id_utilisateur NOT IN (SELECT id_player_1 FROM team UNION SELECT id_player_2 FROM team UNION SELECT id_player_3 FROM team)');
$joueur3->execute();



    if (isset($_POST['form_team'])) 
    {
        if(!empty($_POST['name_team']) and !empty($_POST['player_1']) and !empty($_POST['player_2']) and !empty($_POST['player_3']))
        {
            $team_name = htmlspecialchars($_POST['name_team']);
            $player_1 = intval($_POST['player_1']);
            $player_2 = intval($_POST['player_2']);
            $player_3 = intval($_POST['player_3']);
            $team_namelenght= strlen($team_name);
            if ($team_namelenght <= 30)
            {
                 if(isset($_FILES['avatar']) and !empty($_FILES['avatar']['name'])) 
                {
                    $taillemax = 2097152;
                    $extensionValides = array('jpg','jpeg', 'gif', 'png');
                    if ($_FILES['avatar']['size'] <= $taillemax) 
                    {
                        $extensionUpload = strtolower(substr(strrchr($_FILES['avatar']['name'], '.'), 1));
                        if (in_array($extensionUpload, $extensionValides)) 
                        {
                            $chemin = "assets/logo/".$_SESSION['id'].".".$extensionUpload;
                            $resultat = move_uploaded_file($_FILES['avatar']['tmp_name'], $chemin);
                            $name_logo = $_SESSION['id'].".".$extensionUpload;
                            if ($resultat) 
                            {
                                $create_team=$con->prepare('INSERT INTO team (team_name,id_player_1,id_player_2,id_player_3,team_logo) VALUES (:name,:p1,:p2,:p3,:logo)');
                                $create_team-> bindParam(':name',$team_name);
                                $create_team-> bindParam(':p1',$player_1);
                                $create_team-> bindParam(':p2',$player_2);
                                $create_team-> bindParam(':p3',$player_3);
                                $create_team-> bindParam(':logo',$name_logo);
                                $create_team->execute();
                                echo '<meta http-equiv="refresh" content="0;URL=tournaments-teams.php">';
                            }
                            else
                            {
                                $erreur = "Erreur durant l'importation de votre logo !";
                            }
                        }
                        else
                        {
                            $erreur = "Votre logo doit être du format jpg, jpeg, gif, png, ..";
                        }
                    }
                    else
                    {
                        $erreur = "votre logo est trop grand !";
                    }
                }
                else
                {
                    $erreur = "Vous devez avoir un logo !";
                }
            }
            else
            {
                $erreur = "Votre nom de team est trop grand !";
            }
        }
        else
        {
            $erreur = "Tous les champs doivent être complétés !";
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

                <li><a href="tournaments.php">Tournois</a></li>


                <li>
                    <span class="fa fa-angle-right"></span>
                </li>

                <li>
                    <span>Teams</span>
                </li>

            </ul>
        </div>
        <div class="nk-gap-1"></div>
        <!-- END: Breadcrumbs -->




        <div class="container">
            <div class="row equal-height vertical-gap">
                <div class="col-lg-8">
                <form method="POST" action="" enctype="multipart/form-data">
                <input type="submit" value="CREATE TEAM" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" style="float: right;" name="form_team">
                    <div class="col-sm-10">
                        <div class="col-sm-7">
                            <label for="title_name">TEAM <span class="text-main-1">NAME</span></label>
                            <input type="text" class="form-control" name="name_team" id="title_name">
                        </div>
                    </div>
                    <div class="nk-gap-3"></div>
                    <div class="col-sm-10">
                        <div class="col-sm-7">
                        <div class="nk-gap-1"></div>
                        <label>FIRST <span class="text-main-1">PLAYER</span></label>
                            <select name="player_1" class="form-control">
                             <?php  while($player1=$joueur1->fetch()) { ?>
                                    <option value="<?php echo $player1['id_utilisateur']; ?>">
                                            <?php echo $player1['pseudo']; ?>
                                    </option>
                            <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-10">
                        <div class="col-sm-7">
                        <div class="nk-gap-1"></div>
                        <label>SECONDE <span class="text-main-1">PLAYER</span></label>
                            <select name="player_2" class="form-control">
                            <?php  while($player2=$joueur2->fetch()) { ?>
                                    <option value="<?php echo $player2['id_utilisateur']; ?>">
                                            <?php echo $player2['pseudo']; ?>
                                    </option>
                            <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-10">
                        <div class="col-sm-7">
                        <div class="nk-gap-1"></div>
                        <label>THIRD <span class="text-main-1">PLAYER</span></label>
                            <select name="player_3" class="form-control">
                            <?php  while($player3=$joueur3->fetch()) { ?>
                                    <option value="<?php echo $player3['id_utilisateur']; ?>">
                                            <?php echo $player3['pseudo']; ?>
                                    </option>
                            <?php } ?>
                            </select>
                        </div>
                    </div>
                    <div class="col-sm-10">
                        <div class="col-sm-7">
                        <div class="nk-gap-1"></div>
                        <label>TEAM <span class="text-main-1">LOGO</span><small> (Max 2 Mo)</small></label>
                            <div class="nk-team-logo">
                                <img src="assets/images/team.jpg" alt="" style="width: 126px; height: 126px;">
                            </div>
                            <div class="nk-gap-1"></div>
                            <input type="file" value="CHOISISSEZ UN FICHIER" name=avatar>
                        </div>
                    </div>
                    <?php if(isset($erreur)) { echo $erreur; } ?>
                </div>
                </form>
                <div class="col-lg-4">
                    <!--
                START: Sidebar

                Additional Classes:
                    .nk-sidebar-left
                    .nk-sidebar-right
                    .nk-sidebar-sticky
            -->
<?php include "assets/include/sidebar.php" ?>
        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>