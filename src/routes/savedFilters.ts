import { Router } from 'express';
import {
    createSavedFilter,
    deleteSavedFilter,
    getAllSavedFilters,
    getSavedFilterById,
    updateSavedFilter,
} from '../db/dal/savedFilter';
import { StatusCodes } from 'http-status-codes';

// Handles requests made to /saved-filters
const savedFiltersRouter = Router();

savedFiltersRouter.get('/:id', async (req, res, next) => {
    try {
        const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
        const result = await getSavedFilterById(keycloak_id, req.params.id);
        res.status(StatusCodes.OK).send(result);
    } catch (e) {
        next(e);
    }
});

savedFiltersRouter.get('/', async (req, res, next) => {
    try {
        const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
        const result = await getAllSavedFilters(keycloak_id);
        res.status(StatusCodes.OK).send(result);
    } catch (e) {
        next(e);
    }
});

savedFiltersRouter.get('/tag/:tagid', async (req, res, next) => {
    try {
        const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
        const result = await getAllSavedFilters(keycloak_id, req.params.tagid);
        res.status(StatusCodes.OK).send(result);
    } catch (e) {
        next(e);
    }
});

savedFiltersRouter.post('/', async (req, res, next) => {
    try {
        const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
        const result = await createSavedFilter(keycloak_id, req.body);
        res.status(StatusCodes.CREATED).send(result);
    } catch (e) {
        next(e);
    }
});

savedFiltersRouter.put('/:id', async (req, res, next) => {
    try {
        const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
        const result = await updateSavedFilter(keycloak_id, req.params.id, req.body);
        res.status(StatusCodes.OK).send(result);
    } catch (e) {
        next(e);
    }
});

savedFiltersRouter.delete('/:id', async (req, res, next) => {
    try {
        const keycloak_id = req['kauth']?.grant?.access_token?.content?.sub;
        const result = await deleteSavedFilter(keycloak_id, req.params.id);
        res.status(StatusCodes.OK).send(req.params.id);
    } catch (e) {
        next(e);
    }
});

export default savedFiltersRouter;
