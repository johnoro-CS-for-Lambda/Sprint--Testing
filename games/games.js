let id = 1;

const games = [
  { title: 'Pacman', genre: 'Arcade', releaseYear: 1980, id: id++ }
];

const getById = (gameId) => games.find(({ id }) => id == gameId);

const sendNotFound = res => {
  res.status(404).json({ message: 'No game found with the given id.' });
};

const GET = (req, res) => {
  const { id } = req.params;
  if (!id) { // GET
    return res.status(200).json(games);
  }

  const game = getById(id);

  if (game) { // GET by id
    return res.status(200).json(game);
  }

  return sendNotFound(res);
};

const POST = (req, res) => {
  const { title, genre, releaseYear } = req.body;

  if (!title || !genre) {
    return res.status(422).json({
      message: 'Title and genre are required.'
    });
  }

  for (let game of games) {
    if (title === game.title) {
      return res.status(405).json({
        message: 'That game title is already in use.'
      });
    }
  }

  games.push({ title, genre, releaseYear, id });
  return res.status(201).json(id++);
};

const PUT = (req, res) => {
  const game = getById(req.params.id);

  if (!game) {
    return sendNotFound(res);
  }

  const {
    title = game.title,
    genre = game.genre,
    releaseYear = game.releaseYear
  } = req.body;
  const { id } = game;
  const updated = { title, genre, releaseYear, id };

  let delInd = null, i = 0;
  do {
    if (id === games[i].id) {
      delInd = i;
    }
    i++;
  }
  while (delInd === null);

  return res.status(200).json(games.splice(delInd, 1, updated).length);
};

const DELETE = (req, res) => {
  const game = getById(req.params.id);
  if (!game) {
    return sendNotFound(res);
  }

  let delInd = null, i = 0;
  do {
    if (game.id === games[i].id) {
      delInd = i;
    }
    i++;
  }
  while (delInd === null);

  return res.status(202).json(games.splice(delInd, 1).length);
};

module.exports = {
  GET, 
  POST,
  PUT,
  DELETE
};
