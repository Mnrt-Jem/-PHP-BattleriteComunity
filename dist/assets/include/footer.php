
        <footer class="nk-footer">
             <div class="nk-copyright">
                <div class="container">
                    <div class="nk-copyright-left">
                        Copyright &copy; 2016 | Battlerite Community</a>
                    </div>
                    <div class="nk-copyright-right">
                        <ul class="nk-social-links-2">
                            <!--
                            <li>
                                <a class="nk-social-steam" href="#">
                                    <span class="fa fa-steam"></span>
                                </a>
                            </li>
                            <li>
                                <a class="nk-social-facebook" href="#">
                                    <span class="fa fa-facebook"></span>
                                </a>
                            </li>
                           
                            <li>
                                <a class="nk-social-twitter" href="https://twitter.com/nkdevv" target="_blank">
                                    <span class="fa fa-twitter"></span>
                                </a>
                            </li>
                            

                            <!-- Additional Social Buttons
                        <li><a class="nk-social-behance" href="#"><span class="fa fa-behance"></span></a></li>
                        <li><a class="nk-social-bitbucket" href="#"><span class="fa fa-bitbucket"></span></a></li>
                        <li><a class="nk-social-dropbox" href="#"><span class="fa fa-dropbox"></span></a></li>
                        <li><a class="nk-social-dribbble" href="#"><span class="fa fa-dribbble"></span></a></li>
                        <li><a class="nk-social-deviantart" href="#"><span class="fa fa-deviantart"></span></a></li>
                        <li><a class="nk-social-flickr" href="#"><span class="fa fa-flickr"></span></a></li>
                        <li><a class="nk-social-foursquare" href="#"><span class="fa fa-foursquare"></span></a></li>
                        <li><a class="nk-social-github" href="#"><span class="fa fa-github"></span></a></li>
                        <li><a class="nk-social-instagram" href="#"><span class="fa fa-instagram"></span></a></li>
                        <li><a class="nk-social-linkedin" href="#"><span class="fa fa-linkedin"></span></a></li>
                        <li><a class="nk-social-medium" href="#"><span class="fa fa-medium"></span></a></li>
                        <li><a class="nk-social-odnoklassniki" href="#"><span class="fa fa-odnoklassniki"></span></a></li>
                        <li><a class="nk-social-paypal" href="#"><span class="fa fa-paypal"></span></a></li>
                        <li><a class="nk-social-reddit" href="#"><span class="fa fa-reddit"></span></a></li>
                        <li><a class="nk-social-skype" href="#"><span class="fa fa-skype"></span></a></li>
                        <li><a class="nk-social-soundcloud" href="#"><span class="fa fa-soundcloud"></span></a></li>
                        <li><a class="nk-social-slack" href="#"><span class="fa fa-slack"></span></a></li>
                        <li><a class="nk-social-tumblr" href="#"><span class="fa fa-tumblr"></span></a></li>
                        <li><a class="nk-social-vimeo" href="#"><span class="fa fa-vimeo"></span></a></li>
                        <li><a class="nk-social-vk" href="#"><span class="fa fa-vk"></span></a></li>
                        <li><a class="nk-social-wordpress" href="#"><span class="fa fa-wordpress"></span></a></li>
                        <li><a class="nk-social-youtube" href="#"><span class="fa fa-youtube-play"></span></a></li>
                    -->
                        </ul>
                    </div>
                </div>
            </div>
        </footer>
        <!-- END: Footer -->


    </div>




    <!-- START: Page Background -->
    <video class="nk-page-background-top" muted="muted" autoplay loop="autoplay">
        <source src="assets/images/header.webm">
        <source src="assets/images/header.mp4">
    </video>
    <!--<img class="nk-page-background-top" src="assets/images/bg-top-4.png" alt=""> -->

    <!-- END: Page Background -->




    <!-- START: Search Modal -->
    <?php 
    if (isset($_GET['search']) and !empty($_GET['search'])) 
    {
        $search = htmlspecialchars($_GET['search']);
        $query=$con->prepare('SELECT id_utilisateur,pseudo FROM utilisateur where pseudo = "'.$search.'"');
        $query ->execute();
        $pseudo = $query->fetch();
        echo '<meta http-equiv="refresh" content="0;URL=profile.php?id='.$pseudo['id_utilisateur'].'">';
    } ?>
    <div class="nk-modal modal fade" id="modalSearch" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span class="ion-android-close"></span>
                    </button>

                    <h4 class="mb-0">Recherche</h4>

                    <div class="nk-gap-1"></div>
                    <form method="GET" action="" class="nk-form nk-form-style-1">
                        <input type="text" value="" name="search" class="form-control" placeholder="Rechercher un joueur ...">
                    </form>   
                </div>
            </div>
        </div>
    </div>
    <!-- END: Search Modal -->



    <!-- START: Login Modal -->
    <?php 
        if (isset($_POST['form_connexion'])) 
        {
            $email= htmlspecialchars($_POST['email']);
            $pwd= sha1($_POST['pwd']);
            if (!empty($email) and !empty($pwd))
            {
                    $requete0=$con->prepare('SELECT * FROM utilisateur Where mail = :email and mdp = :pwd');
                    $requete0 -> bindParam(':email',$email);
                    $requete0 -> bindParam(':pwd',$pwd);
                    $requete0 ->execute();
                    $userexist = $requete0->rowCount();
                    if ($userexist == 1)
                    {
                        if (isset($_POST['rememberme'])) {
                            setcookie('email', $email,time()+365*24*3600);
                            setcookie('pwd', $pwd,time()+365*24*3600);
                        }
                        $userinfo = $requete0->fetch();
                        $_SESSION['id'] = $userinfo['id_utilisateur'];
                        $_SESSION['pseudo'] = $userinfo['pseudo'];
                        $_SESSION['mail'] = $userinfo['mail'];
                        $_SESSION['rank'] = $userinfo['rank'];
                        echo '<meta http-equiv="refresh" content="0;URL=profile.php?id='.$_SESSION['id'].'">';
                    }
                    else
                    {
                        $erreur = "Mauvais Email ou Mot de passe";
                    }
            }
            else
            {
                $erreur = "Tous les champs doivent être complétés !";
            }
        }
    ?>
    <div class="nk-modal modal fade" id="modalLogin" tabindex="-1" role="dialog" aria-hidden="true">
        <div class="modal-dialog modal-sm" role="document">
            <div class="modal-content">
                <div class="modal-body">
                    <button type="button" class="close" data-dismiss="modal" aria-label="Close">
                        <span class="ion-android-close"></span>
                    </button>
                    <?php
                        if (isset($_SESSION['id']))
                        {
                    ?>
                    <h4 class="mb-0">
                        <span class="text-main-1">Profile </span><strong> / </strong>  <?php echo $_SESSION['pseudo'] ?></h4>
                        <div class="nk-gap-1"></div>
                        <div class="row vertical-gap" style="text-align: center;">
                        <div class="col-md-12">
                            <a href="profile.php?id=<?php echo $_SESSION['id'] ?>"><img src="assets/images/<?php echo $_SESSION['rank'] ?>.png" alt="rank" style="width: 150px; height: 150px;"></a>
                            <a href="logout.php"><input type="submit" value="DECONNEXION" class="nk-btn nk-btn-rounded nk-btn-color-white nk-btn-block"></a>
                            <!-- video2 17-16 -->
                            </div>
                        </div>
                    <?php 
                        }
                        else
                        {
                    ?>

                    <h4 class="mb-0">
                        <span class="text-main-1">CONNEXION</span><strong> /</strong>  Inscription</h4>

                    <div class="nk-gap-1"></div>
                    <form method="POST" action="" class="nk-form text-white">
                        <div class="row vertical-gap">
                            <div class="col-md-6">
                                Email et Mot de passe:

                                <div class="nk-gap"></div>
                                <input type="email" value="" name="email" class=" form-control" placeholder="Email">

                                <div class="nk-gap"></div>
                                <input type="password" value="" name="pwd" class="required form-control" placeholder="Password">
                                <div class="nk-gap"></div>
                                <input type="checkbox" name="rememberme" id=remember> <label for=remember>Se souvenir de moi</label>
                            </div>
                            <div class="nk-gap"></div>
                            <div class="nk-gap"></div>
                            <div class="nk-gap"></div>
                            <div class="nk-gap"></div>
                            <div class="nk-gap"></div>
                            <div class="nk-gap"></div>
                            <?php
                                if (isset($erreur)) 
                                {
                                    echo '<font color="orange">'.$erreur;
                                }
                            ?>
                        </div>

                        <div class="nk-gap-1"></div>
                            <div class="col-md-6">
                                <input type="submit" value="Connexion" class="nk-btn nk-btn-rounded nk-btn-color-white nk-btn-block" name="form_connexion">
                            </div>
                            <div class="mnt-5">
                                <small><a href="index.php">Réinitialiser votre mot de passe?</a></small>
                            </div>
                            <div class="mnt-5">
                                <small><a href="Inscription.php">Vous n'êtes pas inscrit?</a></small>
                            </div>
                        </div>
                    </form>
                    <?php
                        }
                    ?>
                </div>
            </div>
        </div>
    </div>
    <!-- END: Login Modal -->



    <!-- START: Scripts -->
    <script>
        setInterval('load_messages()', 2000);
        function load_messages() {
            $('#messages').load('assets/include/load_messages.php');
        }
        setInterval('load_privatem()', 2000);
        function load_privatem() {
            $('#messagep').load('assets/include/load_privatem.php');
        }
    </script>


    <!-- GSAP -->
    <script src="assets/bower_components/gsap/src/minified/TweenMax.min.js"></script>
    <script src="assets/bower_components/gsap/src/minified/plugins/ScrollToPlugin.min.js"></script>

    <!-- Bootstrap -->
    <script src="assets/bower_components/tether/dist/js/tether.min.js"></script>
    <script src="assets/bower_components/bootstrap/dist/js/bootstrap.min.js"></script>

    <!-- Sticky Kit -->
    <script src="assets/bower_components/sticky-kit/dist/sticky-kit.min.js"></script>

    <!-- Jarallax -->
    <script src="assets/bower_components/jarallax/dist/jarallax.min.js"></script>
    <script src="assets/bower_components/jarallax/dist/jarallax-video.min.js"></script>

    <!-- Flickity -->
    <script src="assets/bower_components/flickity/dist/flickity.pkgd.min.js"></script>

    <!-- Photoswipe -->
    <script src="assets/bower_components/photoswipe/dist/photoswipe.min.js"></script>
    <script src="assets/bower_components/photoswipe/dist/photoswipe-ui-default.min.js"></script>

    <!-- Jquery Form -->
    <script src="assets/bower_components/jquery-form/jquery.form.js"></script>

    <!-- Jquery Validation -->
    <script src="assets/bower_components/jquery-validation/dist/jquery.validate.min.js"></script>

    <!-- Jquery Countdown + Moment -->
    <script src="assets/bower_components/jquery.countdown/dist/jquery.countdown.min.js"></script>
    <script src="assets/bower_components/moment/min/moment.min.js"></script>
    <script src="assets/bower_components/moment-timezone/builds/moment-timezone-with-data.js"></script>

    <!-- Hammer.js -->
    <script src="assets/bower_components/hammer.js/hammer.min.js"></script>

    <!-- NanoSroller -->
    <script src="assets/bower_components/nanoscroller/bin/javascripts/jquery.nanoscroller.min.js"></script>

    <!-- SoundManager2 -->
    <script src="assets/bower_components/SoundManager2/script/soundmanager2-nodebug-jsmin.js"></script>

    <!-- Seiyria Bootstrap Slider -->
    <script src="assets/bower_components/seiyria-bootstrap-slider/dist/bootstrap-slider.min.js"></script>

    <!-- Summernote -->
    <script src="assets/bower_components/summernote/dist/summernote.min.js"></script>

    <!-- nK Share -->
    <script src="assets/plugins/nk-share/nk-share.js"></script>

    <!-- Prism -->
    <script src="assets/bower_components/prism/prism.js"></script>

    <!-- GoodGames -->
    <script src="assets/js/goodgames.min.js"></script>
    <script src="assets/js/goodgames-init.js"></script>
    <!-- END: Scripts -->



</body>

</html>