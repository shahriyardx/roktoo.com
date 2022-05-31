# [Roktoo](https://roktoo.com)

A blood donating and finding platform for bangladesh. \
This is the oficial source code of [https://roktoo.com](https://roktoo.com)

## Development

First clone the repository

```bash
>> git clone https://github.com/shahriyardx/roktoo.com
```

Then put all the credentials needed in `.env.example` and rename it to `.env.local` and finally install the dependencies and run

```bash
>> yarn intall
>> yarn dev
```

### If you want to run in docker

```bash
>> docker build . -t roktoo
>> docker compose up # -d if you want to run in detached mode
```
