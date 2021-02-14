from database import db

_session = db.session


def commit():
    _session.commit()


def save(model: db.Model) -> db.Model:
    _session.add(model)
    commit()
    return model


def delete(model: db.Model) -> db.Model:
    db.Query.delete()
    commit()
    return model


