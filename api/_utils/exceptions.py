class ToriiException(Exception):
    pass


class ContentLengthMissingError(ToriiException):
    pass

class ContextValueError(ToriiException):
    pass
