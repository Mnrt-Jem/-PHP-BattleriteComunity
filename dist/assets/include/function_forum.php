<?php function get_pseudo($id){global $con;
$pseudo = $con->prepare('SELECT pseudo FROM utilisateur WHERE id_utilisateur = ?');
$pseudo->execute(array($id));
$pseudo = $pseudo->fetch()['pseudo'];
return $pseudo;
}

function reponse_nbr_categorie($id_categorie) {
global $con;
$nbr = $con->prepare('SELECT f_messages.id FROM f_messages LEFT JOIN f_topics_categories ON f_topics_categories.id_topic = f_messages.id_topic  where f_topics_categories.id_categorie = ?');
$nbr->execute(array($id_categorie));
return $nbr->rowCount();
}

function derniere_reponse_categorie($id_categorie) {
global $con;
$rep = $con->prepare('SELECT f_messages.* FROM f_messages LEFT JOIN f_topics_categories ON f_topics_categories.id_topic = f_messages.id_topic WHERE f_topics_categories.id_categorie = ? order by f_messages.date_heure_post DESC LIMIT 0,1');
$rep->execute(array($id_categorie));
if ($rep->rowCount() > 0) {
	$rep = $rep->fetch();
	$dr=$rep['date_heure_post'];
	$dr .= '</div><div class="nk-forum-activity-date">'.get_pseudo($rep['id_posteur']);
}
else { $dr = 'Aucun Post !'; }
return $dr;
}

function get_rank($id){
global $con;
$rank = $con->prepare('SELECT rank FROM utilisateur WHERE id_utilisateur = ?');
$rank->execute(array($id));
$rank = $rank->fetch()['rank'];
return $rank;
}

function derniere_reponse_rank($id_categorie) {
global $con;
$repr = $con->prepare('SELECT f_messages.* FROM f_messages LEFT JOIN f_topics_categories ON f_topics_categories.id_topic = f_messages.id_topic WHERE f_topics_categories.id_categorie = ? order by f_messages.date_heure_post DESC LIMIT 0,1');
$repr->execute(array($id_categorie));
$repr = $repr->fetch();
$drr = get_rank($repr['id_posteur']);
return $drr;
}

function reponse_nbr_topic($id_topic) {
global $con;
$nbrt = $con->prepare('SELECT f_messages.id FROM f_messages LEFT JOIN f_topics ON f_topics.id = f_messages.id_topic  where f_topics.id = ?');
$nbrt->execute(array($id_topic));
return $nbrt->rowCount();
}

function derniere_reponse_topic($id_topic) {
global $con;
$rep = $con->prepare('SELECT f_messages.* FROM f_messages LEFT JOIN f_topics ON f_topics.id = f_messages.id_topic WHERE f_topics.id = ? order by f_messages.date_heure_post DESC LIMIT 0,1');
$rep->execute(array($id_topic));
if ($rep->rowCount() > 0) {
	$rep = $rep->fetch();
	$dr=$rep['date_heure_post'];
	$dr .= '</div><div class="nk-forum-activity-date">'.get_pseudo($rep['id_posteur']);
}
else
{
	$dr = 'Aucune Réponse !';
}
return $dr;
}

function derniere_reponse_topic_rank($id_topic) {
global $con;
$reprr = $con->prepare('SELECT f_messages.* FROM f_messages LEFT JOIN f_topics ON f_topics.id = f_messages.id_topic WHERE f_topics.id = ? order by f_messages.date_heure_post DESC LIMIT 0,1');
$reprr->execute(array($id_topic));
$reprr = $reprr->fetch();
$drr = get_rank($reprr['id_posteur']);
return $drr;
}