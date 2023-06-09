/**
 * Load an entry from the database using the :entryId param
 * Depends on res.locals.roommate
 * The result is saved to res.locals.entry
 * If the entry isn't found redirects to /roommate/:roommateId
 */
module.exports = function (objRepo) {
    return function (req, res, next) {
        const roommate = res.locals.roommate;
        if (!roommate) {
            return res.status(400).end();
        }
        return objRepo.db.Entry.findById(req.params.entryId, function (err, entry) {
            if (err) {
                return next(err);
            }
            if (!entry) {
                return res.status(400).redirect(`/roommate/${roommate.id}`).end();
            }
            res.locals.entry = entry;
            return next();
        });
    };
};