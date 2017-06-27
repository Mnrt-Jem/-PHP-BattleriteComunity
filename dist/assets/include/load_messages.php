<?php
$user = 'root';
$pass = "";

try {
$con = new PDO('mysql:host=localhost;dbname=battlerite', $user, $pass);;
} catch(Exeption $e) {
    die($e);
}
session_start();
?>
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