<?php include "assets/include/header.php" ?>

<?php if (isset($_SESSION['id']) AND $_SESSION['rank'] == "admin") {

    $membre=$con->prepare('SELECT * FROM utilisateur order by id_utilisateur desc');
    $membre->execute(); 
    $rankall=$con->prepare('SELECT rank FROM utilisateur GROUP BY rank');
    $rankall->execute();
    $allnews=$con->prepare('SELECT * FROM news order by id_news desc');
    $allnews->execute();
    $allpatch=$con->prepare('SELECT * FROM PATCHNOTE order by id_patchnote desc');
    $allpatch->execute();
    $allvid=$con->prepare('SELECT * FROM video order by id_video desc');
    $allvid->execute();
    $muted=$con->prepare('SELECT * FROM utilisateur where muted = 1 order by id_utilisateur desc');
    $muted->execute();
    $allteam=$con->prepare('SELECT * FROM team where team_validate = 0');
    $allteam->execute();
    $allteam2=$con->prepare('SELECT * FROM team order by id_team desc');
    $allteam2->execute();
?>
<?php if (isset($_POST['form_membres_delete'])) 
{
    $deleteuser= intval($_POST['user']);
    $requetedelete=$con->prepare('DELETE FROM utilisateur where id_utilisateur = '.$deleteuser.'');
    $requetedelete->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
}
if (isset($_POST['form_membres_update'])) 
{
    $update_user= intval($_POST['user']);
    $update_rank= $_POST['rank'];
    $requeterank=$con->prepare('UPDATE utilisateur SET rank = :nrank where id_utilisateur = :id_utilisateur');
    $requeterank -> bindParam(':nrank',$update_rank);
    $requeterank -> bindParam(':id_utilisateur',$update_user);
    $requeterank->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
}
if (isset($_POST['form_delete_news'])) 
{
    $delete_news=intval($_POST['news']);
    $requetedelete1=$con->prepare('DELETE FROM news where id_news = '.$delete_news.'');
    $requetedelete1->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
}
if (isset($_POST['form_delete_patchnote'])) 
{
    $delete_patch=intval($_POST['patch']);
    $requetedelete2=$con->prepare('DELETE FROM patchnote where id_patchnote = '.$delete_patch.'');
    $requetedelete2->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
}
if (isset($_POST['form_delete_video']))
{
    $delete_video=intval($_POST['video']);
    $requetedelete3=$con->prepare('DELETE FROM video where id_video = '.$delete_video.'');
    $requetedelete3->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
}
if (isset($_POST['form_news_create']))
{
    $title_news=$_POST['titre_news'];
    $text_news=$_POST['text_news'];
    $requete_insert=$con->prepare('INSERT INTO news (title_news,news) VALUES (:title,:news)');
    $requete_insert-> bindParam(':title',$title_news);
    $requete_insert-> bindParam(':news',$text_news);
    $requete_insert->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
}
if (isset($_POST['form_patch_create']))
{
    $title_patch=$_POST['titre_patch'];
    $text_patch=$_POST['text_patch'];
    $requete_insert=$con->prepare('INSERT INTO patchnote (title_patchnote,patchnote) VALUES (:title,:patch)');
    $requete_insert-> bindParam(':title',$title_patch);
    $requete_insert-> bindParam(':patch',$text_patch);
    $requete_insert->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
}
if (isset($_POST['form_video_create']))
{
    $title_vid=$_POST['titre_vid'];
    $lien_vid=$_POST['lien_vid'];
    $requete_insert=$con->prepare('INSERT INTO video (title_video,lien_video) VALUES (:title,:video)');
    $requete_insert-> bindParam(':title',$title_vid);
    $requete_insert-> bindParam(':video',$lien_vid);
    $requete_insert->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
}
if (isset($_POST['form_membres_unmunted']))
{
    $id_user=$_POST['usermute'];
    $unmute=$con->prepare('UPDATE utilisateur SET muted = 0 where id_utilisateur = :id_utilisateur');
    $unmute-> bindParam(':id_utilisateur',$id_user);
    $unmute->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
}
if (isset($_POST['form_team_validate']))
{
    $id_team_validate=$_POST['team_not'];
    $update_team=$con->prepare('UPDATE team SET team_validate = 1 where id_team = :id');
    $update_team-> bindParam(':id',$id_team_validate);
    $update_team->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
}
if (isset($_POST['form_team_delete']))
{
    $id_team=$_POST['team_delete'];
    $update_team=$con->prepare('DELETE FROM team where id_team = :id');
    $update_team-> bindParam(':id',$id_team);
    $update_team->execute();
    echo '<meta http-equiv="refresh" content="0;URL=admin.php">';
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

                <li><a href="profile.php?id=<?php echo $_SESSION['id']?>">Profil</a></li>
                <li>
                    <span class="fa fa-angle-right"></span>
                </li>
                <li><a href="admin.php">Administration</a></li>
                <li>
                    <span><?php echo $_SESSION['pseudo']?></span>
                </li>

            </ul>
        </div>
        <div class="nk-gap-1"></div>
        <!-- END: Breadcrumbs -->




        <div class="container">

            <div class="nk-store nk-store-checkout">
                <h3 class="nk-decorated-h-2">
                    <span>
                        <span class="text-main-1">ESPACE</span> ADMINISTRATION</span>
                </h3>

                <!-- START: Billing Details -->
                <div class="nk-gap"></div>
                <form method="POST" action="" class="nk-form">
                    <div class="row vertical-gap">
                        <div class="col-lg-6">
                            <div class="col-sm-8">
                                <label for="pseudo">LES <span class="text-main-1">MEMBRES</span></label>
                                    <select name="user" class="form-control">
                                    <?php  while($user=$membre->fetch()) { ?>
                                        <option value="<?php echo $user['id_utilisateur']; ?>">
                                            <?php echo $user['rank'] ?> | <?php echo $user['pseudo']; ?>
                                        </option>
                                    <?php } ?>
                                    </select>
                                    <div class="nk-gap-1"></div>
                                    <div class="row vertical-gap">
                                        <div class="col-sm-4">
                                            <input type="submit" value="DELETE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_membres_delete">
                                        </div>
                                        <div class="col-sm-4">
                                        <select name="rank" class="form-control">
                                                <option>
                                                     - - - - - -
                                                </option>
                                            <?php  while($rank=$rankall->fetch()) { ?>
                                                <option value="<?php echo ($rank['rank']); ?>">
                                                    <?php echo $rank['rank']; ?>
                                                </option>
                                            <?php } ?>
                                        </select>
                                        </div>
                                        <div class="col-sm-4">
                                            <input type="submit" value="UPDATE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_membres_update">
                                        </div>
                                    </div>
                                <div class="nk-gap-3"></div>   
                                <label for="pseudo">LES <span class="text-main-1">NEWS</span></label>
                                    <select name="news" class="form-control">
                                    <?php  while($news=$allnews->fetch()) { ?>
                                        <option value="<?php echo ($news['id_news']); ?>">
                                            <?php echo $news['title_news']; ?>
                                        </option>
                                    <?php } ?>
                                    </select>
                                    <div class="nk-gap-1"></div>
                                    <div class="row vertical-gap">
                                        <div class="col-sm-4">
                                            <input type="submit" value="DELETE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_delete_news">
                                        </div>
                                    </div>
                                <div class="nk-gap-3"></div>
                                <label for="pseudo">LES <span class="text-main-1">PATCHNOTES</span></label>
                                    <select name="patch" class="form-control">
                                    <?php  while($patch=$allpatch->fetch()) { ?>
                                        <option value="<?php echo ($patch['id_patchnote']); ?>">
                                            <?php echo $patch['title_patchnote']; ?>
                                        </option>
                                    <?php } ?>
                                    </select>
                                    <div class="nk-gap-1"></div>
                                    <div class="row vertical-gap">
                                        <div class="col-sm-4">
                                            <input type="submit" value="DELETE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_delete_patchnote">
                                        </div>
                                    </div>
                                 <div class="nk-gap-3"></div>
                                <label for="pseudo">LES <span class="text-main-1">VIDEO</span></label>
                                    <select name="video" class="form-control">
                                    <?php  while($vid=$allvid->fetch()) { ?>
                                        <option value="<?php echo ($vid['id_video']); ?>">
                                            <?php echo $vid['title_video']; ?>
                                        </option>
                                    <?php } ?>
                                    </select>
                                    <div class="nk-gap-1"></div>
                                    <div class="row vertical-gap">
                                        <div class="col-sm-4">
                                            <input type="submit" value="DELETE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_delete_video">
                                        </div>
                                    </div>
                            </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="col-sm-8">
                                <label for="pseudo">USER <span class="text-main-1">MUTED</span></label>
                                    <select name="usermute" class="form-control">
                                    <?php  while($usermute=$muted->fetch()) { ?>
                                        <option value="<?php echo $usermute['id_utilisateur']; ?>">
                                             <?php echo $usermute['pseudo']; ?>
                                        </option>
                                    <?php } ?>
                                    </select>
                                    <div class="nk-gap-1"></div>
                                    <div class="row vertical-gap">
                                        <div class="col-sm-4">
                                            <input type="submit" value="UNMUTED" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_membres_unmunted">
                                        </div>
                                    </div>
                            </div>
                            <div class="row vertical-gap">
                            <div class="nk-gap-1"></div>
                                <div class="col-sm-6">
                                    <label for="title_news">TITRE 
                                        <span class="text-main-1">NEWS</span></label>
                                    <input type="text" class="form-control" name="titre_news" id="title_news">
                                </div>
                                <div class="col-sm-6">
                                    <label for="text_news">TEXT 
                                        <span class="text-main-1">NEWS</span></label>
                                    <input type="text" class="form-control" name="text_news" id="text_news">
                                </div>
                                <div class="nk-gap-1"></div>
                                    <div class="col-sm-4">
                                        <input type="submit" value="CREATE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_news_create">
                                    </div>
                            </div>
                            <div class="nk-gap-3"></div>
                            <div class="row vertical-gap">
                                <div class="col-sm-6">
                                    <label for="title_patch">TITRE 
                                        <span class="text-main-1">PATCHNOTE</span></label>
                                    <input type="text" class="form-control" name="titre_patch" id="title_patch">
                                </div>
                                <div class="col-sm-6">
                                    <label for="text_patch">TEXT 
                                        <span class="text-main-1">PATCHNOTE</span></label>
                                    <input type="text" class="form-control" name="text_patch" id="text_patch">
                                </div>
                                <div class="nk-gap-1"></div>
                                    <div class="col-sm-4">
                                        <input type="submit" value="CREATE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_patch_create">
                                    </div>
                            </div>
                            <div class="nk-gap-2"></div>
                            <div class="row vertical-gap">
                                <div class="col-sm-6">
                                    <label for="title_vid">TITRE 
                                        <span class="text-main-1">VIDEO</span></label>
                                    <input type="text" class="form-control" name="titre_vid" id="title_vid">
                                </div>
                                <div class="col-sm-6">
                                    <label for="text_vid">LIEN 
                                        <span class="text-main-1">VIDEO</span></label>
                                    <input type="text" class="form-control" name="lien_vid" id="text_vid">
                                </div>
                                <div class="nk-gap-1"></div>
                                    <div class="col-sm-4">
                                        <input type="submit" value="CREATE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_video_create">
                                        <div class="nk-gap-2"></div>
                                    </div>
                            </div>
                        </div>
                    </div>
                    <h3 class="nk-decorated-h-2">
                    <span>
                        <span class="text-main-1">ESPACE</span> TEAM</span>
                    </h3>
                    <div class="row vertical-gap">
                        <div class="col-lg-6">
                            <div class="col-sm-8">
                                <label for="pseudo">LES TEAMS<span class="text-main-1"> NON VALIDE</span></label>
                                    <select name="team_not" class="form-control">
                                    <?php  while($allteams=$allteam->fetch()) { ?>
                                        <option value="<?php echo ($allteams['id_team']); ?>">
                                            <?php echo $allteams['team_name']; ?>
                                        </option>
                                    <?php } ?>
                                    </select>
                                <div class="nk-gap-1"></div>
                                    <div class="row vertical-gap">
                                        <div class="col-sm-4">
                                            <input type="submit" value="ACCEPTER" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_team_validate">
                                        </div>
                                    </div>
                           </div>
                        </div>
                        <div class="col-lg-6">
                            <div class="col-sm-8">
                                <label for="pseudo">LES <span class="text-main-1">TEAMS</span></label>
                                    <select name="team_delete" class="form-control">
                                    <?php  while($allteams2=$allteam2->fetch()) { ?>
                                        <option value="<?php echo $allteams2['id_team']; ?>">
                                             <?php echo $allteams2['team_name']; ?>
                                        </option>
                                    <?php } ?>
                                    </select>
                                    <div class="nk-gap-1"></div>
                                    <div class="row vertical-gap">
                                        <div class="col-sm-4">
                                            <input type="submit" value="DELETE" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white" name="form_team_delete">
                                        </div>
                                    </div>
                           </div>
                        </div>
                    </div>
                    <div class="nk-gap-2"></div>
                    <h3 class="nk-decorated-h-2">
                    <span>
                        <span class="text-main-1">ESPACE</span> FORUM</span>
                    </h3>
                </form>
                <!-- END: Billing Details -->
            </div>
        </div>
        <div class="nk-gap-2"></div>


<?php 
}
else
{
    echo '<meta http-equiv="refresh" content="0;URL=index.php">';
}

?>

        <!-- START: Footer -->
<?php include "assets/include/footer2.php" ?>