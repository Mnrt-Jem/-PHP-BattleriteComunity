<?php include "assets/include/header.php" ?>
<?php include "assets/include/cookieconnect.php" ?>
<?php $team=$con->prepare('SELECT * FROM team where id_player_1 = '.$_SESSION['id'].' or id_player_2 = '.$_SESSION['id'].' or id_player_3 = '.$_SESSION['id'].' and team_validate = 1');
    $team->execute();
    $yourteam=$team->fetch();

if ($yourteam['team_validate'] == 1)
{

    $team=$con->prepare('SELECT * FROM team where id_player_1 = '.$_SESSION['id'].' or id_player_2 = '.$_SESSION['id'].' or id_player_3 = '.$_SESSION['id'].' and team_validate = 1');
    $team->execute();
    $yourteam=$team->fetch();

    $allteam=$con->prepare('SELECT * FROM team where team_validate = 1 and team_on = 1 order by id_team desc');
    $allteam->execute();
    $id= $yourteam['id_team'];
    $info=$con ->prepare('SELECT Team_on from team where id_team = :id');
    $info-> bindParam(':id',$id);
    $info->execute();
    $team_info=$info->fetch();

    if (isset($_POST['team_on'])) 
    {
        $id_team=$_POST['id_team'];
        $team_on=$con->prepare('UPDATE team SET team_on = 1 where id_team = :id');
        $team_on-> bindParam(':id',$id_team);
        $team_on->execute();
        echo '<meta http-equiv="refresh" content="0;URL=tournaments-match.php">';
    }
    if (isset($_POST['team_off'])) 
    {
        $id_team=$_POST['id_team'];
        $team_off=$con->prepare('UPDATE team SET team_on = 0 where id_team = :id');
        $team_off-> bindParam(':id',$id_team);
        $team_off->execute();
        echo '<meta http-equiv="refresh" content="0;URL=tournaments-match.php">';
    }

    if (isset($_POST['msg_battle'])) 
    {
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
                        <span class="text-main-1"><strong>INFORMATION :</strong></span> Vous pouvez choissir une team à affrontez si celle-ci accepte. </a>
                    </div>
                    <div class="nk-gap-1"></div>

                    <!-- Youre: Teams -->
                    <?php 
                        $name1=$con->prepare('SELECT pseudo from utilisateur where id_utilisateur = :id');
                        $name1-> bindParam(':id',$yourteam['id_player_1']);
                        $name1->execute();
                        $name1=$name1->fetch();

                        $name2=$con->prepare('SELECT pseudo from utilisateur where id_utilisateur = :id');
                        $name2-> bindParam(':id',$yourteam['id_player_2']);
                        $name2->execute();
                        $name2=$name2->fetch();

                        $name3=$con->prepare('SELECT pseudo from utilisateur where id_utilisateur = :id');
                        $name3-> bindParam(':id',$yourteam['id_player_3']);
                        $name3->execute();
                        $name3=$name3->fetch();
                    ?>
                    <div class="nk-team">
                        <div class="nk-team-logo">
                            <img src="assets/logo/<?php echo $yourteam['team_logo']; ?>" alt="" style="width: 126px; height: 126px;">
                        </div>
                        <div class="nk-team-cont">
                            <h3 class="h5 mb-20">
                                <span class="text-main-1">Team :</span> <?php echo $yourteam['team_name']; ?></h3>
                                <div style="float: right;">
                                <form method="POST" action="">
                                    <?php if ($team_info['Team_on']==0) { ?>
                                    <input type="hidden" name="id_team" value="<?php echo $yourteam['id_team'] ?>">
                                    <input type="submit" value="SEARCH TEAM MATCH" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="team_on">
                                    <?php } 
                                    else {} ?>
                                    <?php if ($team_info['Team_on']==1) { ?>
                                    <input type="hidden" name="id_team" value="<?php echo $yourteam['id_team'] ?>">
                                    <input type="submit" value="OFF TEAM MATCH" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="team_off">
                                    <?php } 
                                    else {} ?>
                                </form>
                                </div>
                            <h4 class="h6 mb-5">Membres :</h4>
                            <?php echo $name1['pseudo']; ?> -  <?php echo $name2['pseudo']; ?> -  <?php echo $name3['pseudo']; ?>
                        </div>
                    </div>
                    <div class="nk-gap-3"></div>
                    <!-- END: Teams -->
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
                                <div style="float: right;">
                                    <?php if ($yourteam['Team_on'] == 1 and $yourteam['id_team'] !== $allteams['id_team'] ) { ?>
                                    <form>
                                        <input type="hidden" name="team_battle" value="<?php echo $allteams['id_team'] ?>">
                                        <input type="submit" value="Battle" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="msg_battle"> <!-- ICI IL FAUT QUE JE FASSE LE FORMULAIRE POUR ENVOYER UN MESSAGE PEUX ETRE NEED NOUVELLE TABLE -->
                                    </form>
                                    <?php }
                                    else {} ?>
                                </div>
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
<?php }
else {
    echo '<body onLoad="alert(\'Vous devez avoir une team validée par un admin pour pouvoir accéder au Team Match\')">';
    echo '<meta http-equiv="refresh" content="0;URL=tournaments-teams.php">';
}