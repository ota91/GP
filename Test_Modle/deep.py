import pandas as pd
import tensorflow as tf
from sklearn.model_selection import train_test_split
from sklearn.preprocessing import LabelEncoder

# Load the CSV file
data_file = "Filtered_Dataset.csv"
df = pd.read_csv(data_file)

# Define the variables for classification
X = df["Name"]
y = df["Category"]

# Split the data into training and testing sets
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Tokenize names and convert to numerical sequences
tokenizer = tf.keras.preprocessing.text.Tokenizer()
tokenizer.fit_on_texts(X_train)
X_train_seq = tokenizer.texts_to_sequences(X_train)
X_test_seq = tokenizer.texts_to_sequences(X_test)

# Pad sequences to ensure uniform length
max_length = max([len(seq) for seq in X_train_seq])
X_train_padded = tf.keras.preprocessing.sequence.pad_sequences(X_train_seq, maxlen=max_length, padding='post')
X_test_padded = tf.keras.preprocessing.sequence.pad_sequences(X_test_seq, maxlen=max_length, padding='post')

# Encode category labels
label_encoder = LabelEncoder()
y_train_encoded = label_encoder.fit_transform(y_train)
y_test_encoded = label_encoder.transform(y_test)

# Define the neural network model
model = tf.keras.Sequential([
    tf.keras.layers.Embedding(input_dim=len(tokenizer.word_index) + 1, output_dim=64),
    tf.keras.layers.GlobalAveragePooling1D(),
    tf.keras.layers.Dense(128, activation='relu'),
    tf.keras.layers.Dense(len(label_encoder.classes_), activation='softmax')
])

# Compile the model
model.compile(optimizer='adam', loss='sparse_categorical_crossentropy', metrics=['accuracy'])

# Train the model
model.fit(X_train_padded, y_train_encoded, epochs=10, validation_data=(X_test_padded, y_test_encoded))

# Evaluate the model
loss, accuracy = model.evaluate(X_test_padded, y_test_encoded)
print(f"Accuracy on the test set: {accuracy}")

# Classify names
input_name = "ploto"  # Example name to classify
#input_name = "Playgrounds heang Ibn Taymi"  # Example name to classify
input_seq = tokenizer.texts_to_sequences([input_name])
input_padded = tf.keras.preprocessing.sequence.pad_sequences(input_seq, maxlen=max_length, padding='post')
prediction = model.predict(input_padded)
category_index = prediction.argmax()
predicted_category = label_encoder.classes_[category_index]

print(f"Predicted category for the name '{input_name}': {predicted_category}")
