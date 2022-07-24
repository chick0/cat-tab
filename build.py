from os import mkdir
from glob import glob
from json import load
from zipfile import ZipFile
from zipfile import ZIP_DEFLATED


def get_files() -> list:
    return [
        x for x in glob("**", recursive=True)
        if not x.startswith("dist") and not x.endswith(".py")
    ]


def get_metadata() -> dict:
    return load(open("manifest.json", mode="r", encoding="utf8"))


def main():
    files = get_files()
    metadata = get_metadata()

    print("total files:", len(files))

    with ZipFile(
        file="dist/{name}-{version}.zip".format(
            name=metadata['name'],
            version=metadata['version']
        ),
        mode="w",
        compression=ZIP_DEFLATED,
        compresslevel=9
    ) as zip:
        for file in files:
            print(" +", file), zip.write(file)


if __name__ == "__main__":
    try:
        mkdir("dist")
    except FileExistsError:
        pass

    main()
