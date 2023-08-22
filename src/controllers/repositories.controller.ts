import axios from 'axios';
import { Request, Response } from 'express';

type TRepositoriesParams = { owner: string };

enum RepositoriesURLs {
  Organization = 'orgs',
  User = 'users',
}

async function listRepositories(
  request: Request<TRepositoriesParams>,
  response: Response,
) {
  const { owner: userName } = request.params;

  const userUrl = `/users/${userName}`;
  const ownerType = await axios.get<{ type: 'Organization' | 'User' }>(userUrl)
    .then(({ data }) => data.type);

  const repositoriesUrl = `/${RepositoriesURLs[ownerType]}/${userName}/repos`;
  const { data } = await axios.get(repositoriesUrl);

  response.json(data);
}

async function getRepository(
  request: Request<TRepositoriesParams & { repositoryName: string }>,
  response: Response,
) {
  const { owner, repositoryName } = request.params;
  const url = `/repos/${owner}/${repositoryName}`;

  const { data } = await axios.get(url);
  response.json(data);
}

export { getRepository, listRepositories };
