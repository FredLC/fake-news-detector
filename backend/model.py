from transformers import pipeline

classifier = pipeline("text-classification", model="distilbert-base-uncased-finetuned-sst-2-english")

def predict_fake_news(text):
    result = classifier(text)[0]
    return "Fake News" if result["label"] == "NEGATIVE" else "Real News"
