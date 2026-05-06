from django.contrib.auth.password_validation import validate_password
from rest_framework import serializers
from .models import UserModel


class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"}
    )
    password_confirm = serializers.CharField(
        write_only=True,
        min_length=8,
        style={"input_type": "password"}
    )

    class Meta:
        model = UserModel
        fields = [
            'first_name', 'middle_name', 'last_name',
            'username', 'email', 'phone',
            'region', 'district', 'telegram', 'school',
            'password', 'password_confirm'
        ]

    def validate(self, attrs):
        if attrs["password"] != attrs["password_confirm"]:
            raise serializers.ValidationError({
                "password": "Parollar mos kelmayabdi"
            })

        validate_password(attrs["password"])

        return attrs

    def create(self, validated_data):
        validated_data.pop("password_confirm")
        password = validated_data.pop("password")

        user = UserModel(**validated_data)
        user.set_password(password)
        user.save()

        return user


class LoginSerializer(serializers.Serializer):
    username = serializers.CharField(required=True)
    password = serializers.CharField(required=True, style={"input_type": "password"})


class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = UserModel
        fields = [
            'guid', 'first_name', 'middle_name', 'last_name',
            'username', 'email', 'phone',
            'region', 'district', 'telegram', 'school',
        ]
        read_only_fields = ['guid', 'username']
