<?php include "assets/include/header.php" ?>
<?php include "assets/include/cookieconnect.php" ?>
<?php 
    $team=$con->prepare('SELECT * FROM team where id_player_1 = '.$_SESSION['id'].' or id_player_2 = '.$_SESSION['id'].' or id_player_3 = '.$_SESSION['id'].'');
    $team->execute();
    $name_team=$team->fetch();

    $allteam=$con->prepare('SELECT * FROM team where team_validate = 1 order by id_team desc');
    $allteam->execute();

if (isset($_POST['form_team_delete']))
{
    $id_team=$_POST['delete_team'];
    $delete=$con->prepare('DELETE FROM team where id_team = :id');
    $delete-> bindParam(':id',$id_team);
    $delete->execute();
    echo '<meta http-equiv="refresh" content="0;URL=tournaments-teams.php">';
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
                    <div class="nk-post-share">
                        <span class="text-main-1"><strong>INFORMATION :</strong></span> A la création d'une team celle-ci doit etre validé par un admin du discord. Veuillez vous rendre sur le discord de battlerite Community → <a href="https://discord.gg/KywgHnD" target="_blank">https://discord.gg/KywgHnD</a>
                    </div>
                    <div class="nk-gap-1"></div>
                <?php 
                    if (isset($_SESSION['id']) and !empty($_SESSION['id']))
                    { 
                        ?>
                    <div class="nk-post-share">
                        <span class="h5">Votre Team : <span class="text-main-1"><?php if (isset($team)) { echo $name_team['team_name']; } ?></span></span>
                                <span style="float: right;">
                                    <?php if (empty($name_team)) { ?>
                                        <a href="team_create.php"><input type="submit" value="CREATE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white"></a>
                                    <?php } ?>
                                     <form method="POST" action="">
                                     <input type="hidden" name="delete_team" value="<?php echo $name_team['id_team']?>">
                                    <?php if (!empty($name_team)) { ?>
                                        <input type="submit" value="DELETE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_team_delete">
                                    <?php } ?></span>
                                    </form>
                    </div>
                    <div class="nk-gap-1"></div>


                    <!-- Youre: Teams -->
                    <?php 
                        if (isset($name_team) and !empty($name_team)) { 
                        $name1=$con->prepare('SELECT pseudo from utilisateur where id_utilisateur = :id');
                        $name1-> bindParam(':id',$name_team['id_player_1']);
                        $name1->execute();
                        $name1=$name1->fetch();

                        $name2=$con->prepare('SELECT pseudo from utilisateur where id_utilisateur = :id');
                        $name2-> bindParam(':id',$name_team['id_player_2']);
                        $name2->execute();
                        $name2=$name2->fetch();

                        $name3=$con->prepare('SELECT pseudo from utilisateur where id_utilisateur = :id');
                        $name3-> bindParam(':id',$name_team['id_player_3']);
                        $name3->execute();
                        $name3=$name3->fetch();
                    ?>
                    <div class="nk-team">
                        <div class="nk-team-logo">
                            <img src="assets/logo/<?php echo $name_team['team_logo']; ?>" alt="" style="width: 126px; height: 126px;">
                        </div>
                        <div class="nk-team-cont">
                            <h3 class="h5 mb-20">
                                <span class="text-main-1">Team :</span> <?php echo $name_team['team_name']; ?></h3>
                            <h4 class="h6 mb-5">Membres :</h4>
                            <?php echo $name1['pseudo']; ?> -  <?php echo $name2['pseudo']; ?> -  <?php echo $name3['pseudo']; ?>
                        </div>
                    </div>
                    <div class="nk-gap-3"></div>
                    <?php  }
                    else {} ?>
                    <!-- END: Teams -->
                    <?php } 
                    else
                    {} ?>
                    <!-- all: Teams -->
                    <?php while ($allteams = $allteam->fetch()) {

                        $p1=$con->prepare('SELECT pseudo from utilisateur where id_utilisateur = :id');
                        $p1-> bindParam(':id',$allteams['id_player_1']);
                        $p1->execute();
                        $p1=$p1->fetch();

                        $p2=$con->prepare('SELECT pseudo from utilisateur where id_utilisateur = :id');
                        $p2-> bindParam(':id',$allteams['id_player_2']);
                        $p2->execute();
                        $p2=$p2->fetch();

                        $p3=$con->prepare('SELECT pseudo from utilisateur where id_utilisateur = :id');
                        $p3-> bindParam(':id',$allteams['id_player_3']);
                        $p3->execute();
                        $p3=$p3->fetch();



                        ?>
                    <div class="nk-team">
                        <div class="nk-team-logo">
                            <img src="assets/logo/<?php echo $allteams['team_logo']; ?>" alt="" style="width: 126px; height: 126px;">
                        </div>
                        <div class="nk-team-cont">
                            <h3 class="h5 mb-20">
                                <span class="text-main-1">Team :</span> <?php echo $allteams['team_name'] ?> </h3>
                            <h4 class="h6 mb-5">Membres :</h4>
                            <?php echo $p1['pseudo']  ?> - <?php echo $p2['pseudo']  ?> - <?php echo $p3['pseudo']  ?>
                        </div>
                    </div>
                    <?php } ?>
                    <!-- END: Teams -->


                </div>
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