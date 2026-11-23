"""Exercise the installed fixture package."""

import pytest

from ci_python_fixture import add


@pytest.mark.parametrize(("left", "right", "expected"), [(2, 3, 5), (-2, 1, -1)])
def test_add(left: int, right: int, expected: int) -> None:
    assert add(left, right) == expected
