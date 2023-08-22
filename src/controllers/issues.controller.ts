import axios from 'axios';
import { Request, Response } from 'express';

type TIssuesParams = { owner: string; repositoryName: string };
type TIssuesQueries = { opened: boolean; page: number; per_page: number };

async function listIssues(
  request: Request<TIssuesParams, null, null, TIssuesQueries>,
  response: Response,
) {
  const { owner, repositoryName } = request.params;
  const url = `/repos/${owner}/${repositoryName}/issues`;

  const { data } = await axios.get(url, { params: request.query });
  response.json(data);
}

async function getIssue(
  request: Request<TIssuesParams & { id: string }>,
  response: Response,
) {
  const { owner, repositoryName, id } = request.params;
  const url = `/repos/${owner}/${repositoryName}/issues/${id}`;

  const { data } = await axios.get(url);
  response.json(data);
}

export { getIssue, listIssues };
