import openai

openai.api_key = "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"

input_text = """
في صباح مشمس، استيقظت ليلى من نومها وقررت الذهاب إلى الحديقة. عند وصولها، وجدت أصدقاءها ينتظرونها للعب كرة القدم.
"""

response = openai.chat.completions.create(
    model="gpt-4o-mini",
    messages=[
        {"role": "system", "content": "أنت مساعد يحول النص إلى مشاهد مكتوبة."},
        {"role": "user", "content": f"قسم النص التالي إلى مشاهد مكتوبة بشكل مرتب:\n{input_text}"}
    ],
    temperature=0.7,
    max_tokens=500
)

print(response.choices[0].message.content.strip())
