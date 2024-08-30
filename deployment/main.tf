terraform {
  required_providers {
    aws = {
        source = "hashicorp/aws"
        version = "~> 4.0"
    }
  }
}

provider "aws" {
  region = "${var.region}"
  shared_credentials_files = ["~/.aws/credentials"]
  profile = "personal"
}

module "template_files" {
  source = "hashicorp/dir/template"

  base_dir = "${path.module}/../public"
}

resource "aws_s3_bucket" "burning-earth" {
  bucket = "${var.bucket_name}"
}

resource "aws_s3_bucket_policy" "burning_earth_policy" {
  bucket = aws_s3_bucket.burning-earth.id

  policy = jsonencode({
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "PublicReadGetObject",
            "Effect": "Allow",
            "Principal": "*",
            "Action": "s3:GetObject",
            "Resource": "arn:aws:s3:::${var.bucket_name}/*"
        }
    ]
  })
}

resource "aws_s3_bucket_website_configuration" "burning_earth_website_configuration" {
  bucket = aws_s3_bucket.burning-earth.id

  index_document {
    suffix = "index.html"
  }

  error_document {
    key = "index.html"
  }
}

resource "aws_s3_object" "burning_earth_files" {
  bucket = aws_s3_bucket.burning-earth.id

  for_each = module.template_files.files

  key = each.key
  content_type = each.value.content_type
  source = each.value.source_path
  content = each.value.content

  etag = each.value.digests.md5

  cache_control = "public, max-age=0, s-maxage=60, must-revalidate"
}