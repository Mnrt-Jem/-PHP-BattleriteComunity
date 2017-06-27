                    <aside class="nk-sidebar nk-sidebar-right nk-sidebar-sticky">
                        <div class="nk-widget nk-widget-highlighted">
                            <h4 class="nk-widget-title">
                                <span>
                                    <span class="text-main-1">Chat</span> Général</span>
                            </h4>
                            <?php
                            if (isset($_POST['message']) AND !empty($_POST['message']))
                                {
                                    $id = $_SESSION['id'];
                                    $rank = $_SESSION['rank'];

                                    $message =htmlspecialchars($_POST['message']);
                                    $messagelenght=strlen($message);
                                    if ($messagelenght <= 140) {

                                        $requete0=$con->prepare('SELECT * FROM utilisateur where id_utilisateur = :id');
                                        $requete0 -> bindParam(':id',$id);
                                        $requete0 ->execute();
                                        $user=$requete0->fetch();

                                        $requete=$con->prepare('INSERT INTO tchat(tchat_pseudo, message, rank) VALUES (:pseudo, :message, :rank)');
                                        $requete -> bindParam(':pseudo',$_SESSION['pseudo']);
                                        $requete -> bindParam(':message',$message);
                                        $requete -> bindParam(':rank',$rank);
                                        $requete ->execute();
                                    }
                                    else {
                                    }

                                }
                            ?>
                            <div class="nk-widget-content">
                                <div id="messages">
                                    <?php
                                        $requete1=$con->prepare('SELECT * FROM tchat ORDER BY id_tchat DESC LIMIT 0,8');
                                        $requete1 ->execute();

                                        $mute=$con->prepare('SELECT id_utilisateur FROM utilisateur where muted = 1 and id_utilisateur = :id_user');
                                        $mute -> bindParam(':id_user',$_SESSION['id']);
                                        $mute ->execute();
                                        $muted=$mute->fetch();
                                        while ($msg = $requete1->fetch())
                                        {
                                            $emoji_replace = array(':)',':(',':3',':|',':o',':D',':/',':.',':\'(','x\'(','x(',';)','^^',':\')','xD','XD');
                                            $emoji_new = array('<img src="assets/images/emoticons/emoticons.png" />','<img src="assets/images/emoticons/emoticons1.png" />','<img src="assets/images/emoticons/emoticons2.png" />','<img src="assets/images/emoticons/emoticons3.png" />','<img src="assets/images/emoticons/emoticons4.png" />','<img src="assets/images/emoticons/emoticons5.png" />','<img src="assets/images/emoticons/emoticons6.png" />','<img src="assets/images/emoticons/emoticons7.png" />','<img src="assets/images/emoticons/emoticons8.png" />','<img src="assets/images/emoticons/emoticons9.png" />','<img src="assets/images/emoticons/emoticons11.png" />','<img src="assets/images/emoticons/emoticons12.png" />','<img src="assets/images/emoticons/emoticons13.png" />','<img src="assets/images/emoticons/emoticons14.png" />','<img src="assets/images/emoticons/emoticons15.png" />','<img src="assets/images/emoticons/emoticons16.png" />');
                                            $msg['message'] = str_replace($emoji_replace, $emoji_new, $msg['message']);
                                    ?>
                                    <img src="assets/images/<?php echo $msg['rank']; ?>.png" style="width: 35px; height: 35px;"> <strong><?php echo $msg['tchat_pseudo']; ?> : </strong><span style="overflow-wrap: break-word;"><?php echo $msg['message']; ?> </br>
                                    <?php
                                        }
                                    ?>
                                    </div>
                                    <div>
                                <?php if (isset($_SESSION['id']) and $muted['id_utilisateur'] !== $_SESSION['id'])
                                    {
                                    ?>
                                    <div class="nk-gap-1"></div>
                                    <form method="post" action="">
                                         <textarea class="form-control" name="message" id="notes" placeholder="Message ... (140 caractères max)" rows="3"></textarea>
                                         <div class="nk-gap-1"></div>
                                        <input type="submit" value="Envoyer" class="nk-btn nk-btn-rounded nk-btn-color-main-1 nk-btn-hover-color-white">
                                    </form>
                                    <?php }
                                    else
                                    {

                                        } ?>
                                    </div>

                            </div>
                        </div>
                        <div class="nk-widget nk-widget-highlighted">
                            <h4 class="nk-widget-title">
                                <span>
                                    <span class="text-main-1">Discord</span> Community</span>
                            </h4>
                            <div class="nk-widget-content">
                                    <iframe src="https://discordapp.com/widget?id=258189983578456064&theme=dark" width="300" height="400" allowtransparency="true" frameborder="0"></iframe>
                            </div>
                        </div>
                    </aside>
                    <!-- END: Sidebar -->
                </div>
            </div>
        </div>

        <div class="nk-gap-4"></div>