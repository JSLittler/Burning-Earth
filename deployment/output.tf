output "website_url" {
    description = "url for deployed s3 web page"
    value = aws_s3_bucket_website_configuration.burning_earth_website_configuration.website_endpoint
}