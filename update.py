from os import rename
from os import listdir
from os.path import join
from json import dumps
from hashlib import sha256

PATH = join(".", "src")


def main():
    path_list = [x for x in listdir(PATH) if x.endswith(".webp")]
    print("total_imgs", len(path_list))

    for path in path_list:
        old_img_path = join(PATH, path)

        with open(old_img_path, mode="rb") as img_reader:
            image = img_reader.read()

        new_name = sha256(image).hexdigest() + ".webp"
        if path != new_name:
            rename(old_img_path, join(PATH, new_name))

    json = "// auto generated with update.py\n" + \
         "export default " + dumps(
            obj=[f"/src/{x}" for x in [x for x in listdir(PATH) if x.endswith(".webp")]],
            indent=4,
            sort_keys=True
        ) + ";"

    with open(join(".", "app", "cats.js"), mode="w", encoding="utf-8") as cats_writer:
        cats_writer.write(json)


if __name__ == "__main__":
    main()
