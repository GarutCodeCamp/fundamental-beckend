/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = pgm => {
    pgm.sql("INSERT INTO user(id,useraname, password,fullname) VALUES ('old_notes','old_notes','old_notes','old_notes')");
    pgm.sql("UPDATE notes SET owner = 'old_notes' WHERE owner = NULL");
    pgm.addConstraint('notes', 'fk_notes.owner_user.id', 'FOREIGN KEY(owner) REFERENCES user(id) ON DELETE CASCADE');
};

exports.down = pgm => {
    pgm.dropConstraint('notes', 'fk_notes.owner_user.id');
    pgm.sql("UPDATE notes SET owner = NULL WHERE owner = 'old_notes'");

    // menghapus user baru.
    pgm.sql("DELETE FROM users WHERE id = 'old_notes'");
};
