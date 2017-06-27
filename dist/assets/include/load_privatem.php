<?php
$user = 'root';
$pass = "";

try {
$con = new PDO('mysql:host=localhost;dbname=battlerite', $user, $pass);;
} catch(Exeption $e) {
    die($e);
}
session_start();

if (isset($_SESSION['id']) and !empty($_SESSION['id'])) {

    $membre=$con->prepare('SELECT * FROM utilisateur order by pseudo');
    $membre->execute();

    $allmessage=$con->prepare('SELECT * FROM message where id_destinataire = :my_id order by id_message DESC limit 0,6');
    $allmessage->bindParam(':my_id',$_SESSION['id']);
    $allmessage->execute();
    }
?>
<?php while ($allmsg=$allmessage->fetch()) {

$p_exp=$con->prepare('SELECT pseudo FROM utilisateur where id_utilisateur = :pseudo');
$p_exp->bindParam(':pseudo',$allmsg['id_expediteur']);
$p_exp->execute();
$p_exp = $p_exp->fetch();
$p_exp = $p_exp['pseudo']; ?>
<span style="overflow-wrap: break-word;">
<span class="text-main-1"><strong><?php echo $p_exp; ?></strong></span> : <?php echo $allmsg['message']; ?> <form method="post" action=""><input type="hidden" name="msg_delete_vls" value="<?=$allmsg['id_message'] ?>"><a href="#" onclick="$(this).closest('form').submit()">Supprimer</a></form>
</span>
<div class="nk-gap-1"></div>
<?php } ?>