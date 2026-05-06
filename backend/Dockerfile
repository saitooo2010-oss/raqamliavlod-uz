FROM python:3.13-alpine3.21

WORKDIR /app
COPY . .

RUN pip install --no-cache-dir -r requirements.txt
RUN python3 manage.py collectstatic


ENTRYPOINT ["sh", "/app/entrypoint.sh"]
CMD ["gunicorn", "config.wsgi:application", "--bind", "0.0.0.0:8000"]
