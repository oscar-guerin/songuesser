export const fr: any = {
  sign: {
    header: 'Songuesser',
    title: 'Songuesser, blind tests sur mesure',
    description: `Créez des blind tests 100% personnalisés à l'aide de votre compte Spotify et jouez en famille ou entre amis !`,
    login_spotify: 'Connectez-vous avec Spotify',
    screenshot_launcher_legend: `Choisissez une chanson thème, renseignez les noms des différents joueurs et commencez la partie !`
  },
  home: {
    title: 'Bienvenue sur Songuesser !',
    principle: {
      title: 'Principe du jeu',
      system: `Songuesser propose une expérience blind test personnalisée. Chaque partie est axée autour d'une <strong>chanson "thème"</strong>.
                Cette chanson, choisie par les joueurs juste avant la partie, va servir de base de recherche à <strong>Spotify</strong> pour
                trouver des chansons similaires qu'il faudra cette fois-ci deviner.`,
      songs: `Une fois la partie commencée, les chansons vont s'enchainer jusqu'à la fin de la partie. Pour chaque chanson,
              <strong>20 secondes</strong> sont accordées pour que tous les joueurs essayent de deviner le titre et l'interprète de la chanson
              puis la réponse sera affichée pendant environ <strong>10 secondes</strong> avant de passer à la chanson suivante.`,
      points: `Le premier joueur à énoncer le titre de la chanson gagne <strong>1 point</strong>, de même pour le premier à énoncer l'interprète.
              Une fois la réponse dévoilée, le joueur le plus proche a <strong>10 secondes</strong> pour cliquer sur les noms des joueurs ayant
              trouvé le titre et l'interprète. A la fin de la partie, le joueur ayant le plus de points gagne !`
    }
  },
  game: {
    start: 'Jouer',
    launch: 'Démarrer la partie',
    listen: 'Écoutez...',
    songs_remaining: 'Encore {{songs}} chanson(s) avant la fin de la partie',
    last_song: `C'est la dernière chanson !`,
    winner_is: 'Le gagnant est {{name}} !',
    return_home: `Retourner à l'accueil`,
    new_game: 'Nouvelle partie',
    update_score: {
      song: 'Quel joueur a deviné le titre de la chanson ?',
      artist: `Quel joueur a deviné le nom de l'artiste ?`,
      nobody: 'Aucun'
    },
    track_history: {
      title: 'Chansons précédentes'
    },
    scoreboard: {
      title: 'Tableau des scores'
    }
  },
  launcher: {
    title: 'Nouvelle partie',
    search: 'Recherchez une chanson',
    seed_search_description: `Les chansons proposées lors de la partie seront ressemblantes au thème choisi`,
    define_theme: 'Définissez un thème',
    add_players: 'Ajoutez des participants',
    add_players_description: 'Pour un maximum de fun',
    add_player: 'Ajoutez un participant',
    launch_disabled_tooltip: `Choisissez un thème et entrez le nom d'au moins 2 joueurs pour commencer la partie !`
  },
  about: {
    title: 'À propos',
    project: `Le projet <strong>Songuesser</strong> est une initiative personnelle et indépendante ayant pour but d'explorer les
              possibilités offertes par l'API publique <a href="spotify.com" target="_blank">Spotify</a>.`,
    icons: `Icônes conçues par <a href="https://www.freepik.com" title="Freepik">Freepik</a> from
            <a href="https://www.flaticon.com/fr/" title="Flaticon">www.flaticon.com</a>`,
    author: `À propos de l'auteur`,
    author_name: 'Oscar Guérin, 23 ans',
    author_job: 'Ingénieur informatique',
    author_description: `Diplômé ingénieur informatique en 2019, je suis une carrière de développeur web depuis maintenant 2
                        ans. Ce projet a pour but de perfectionner et de mettre en application mes connaissances en Angular,
                        NestJS ou encore Firebase mais aussi de mettre en place le protocole OAuth2 utilisé par l'API publique
                        de Spotify.`,
    author_technical: `Pour toute question technique sur le projet, merci de consulter les dépots GitHub :`,
    author_contact: `Pour toute question ou demande d'ajout de fonctionnalité, n'hésitez pas à me contacter par
                     <a href="mailto:oscar.guerin@gmail.com">mail</a> ou sur
                     <a href="https://www.linkedin.com/in/oscar-gu%C3%A9rin-97816413b/" target="_blank">Linkedin</a>.`,
    git_front: 'Front End (Angular 11)',
    git_api: 'API (Authentification Spotify, NestJS)'
  },
  header: {
    home: 'Accueil',
    about: 'À propos'
  },
  shared: {
    type_2_chars: 'Commencez à taper pour rechercher',
    logout: 'Déconnexion'
  }
};
