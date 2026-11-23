"""Exercise the installed fixture package."""

from ci_python_fixture import add


def test_add_positive_numbers() -> None:
    """Add two positive numbers."""
    assert add(2, 3) == 5


def test_add_negative_number() -> None:
    """Add numbers with opposite signs."""
    assert add(-2, 1) == -1
