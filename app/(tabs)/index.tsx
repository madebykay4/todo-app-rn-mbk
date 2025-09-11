import {Text, TouchableOpacity, SafeAreaView, StatusBar, FlatList, View, Alert, TextInput} from "react-native";
import useTheme from "@/hooks/useTheme";
import {createHomeStyles} from "@/assets/styles/home.styles";
import {LinearGradient} from "expo-linear-gradient";
import Header from "@/components/Header";
import TodoInput from "@/components/TodoInput";
import {useMutation, useQuery} from "convex/react";
import {api} from "@/convex/_generated/api";
import LoadingSpinner from "@/components/LoadingSpinner";
import {Doc, Id} from "@/convex/_generated/dataModel";
import {Ionicons} from "@expo/vector-icons";
import {toggleTodo} from "@/convex/todos";
import EmptyState from "@/components/EmptyState";
import {useState} from "react";

type Todo = Doc<"todos">

export default function Index() {
    const {colors} = useTheme();
    const homeStyles = createHomeStyles(colors);

    const [editingId, setEditingId] = useState<Id<"todos"> | null>(null);
    const [editText, setEditText] = useState("");

    const todos = useQuery(api.todos.getTodos);

    const toggleTodo = useMutation(api.todos.toggleTodo);
    const deleteTodo = useMutation(api.todos.deleteTodo);
    const updateTodo = useMutation(api.todos.updateTodo);

    const isLoading = todos === undefined;
    if (isLoading) return <LoadingSpinner/>

    const handleToggleTodo = async (id: Id<"todos">) => {
        try {
            await toggleTodo({id});
        } catch (error) {
            console.log("Error toggling todo", error);
            Alert.alert("Error", "Failed to toggle todo")
        }
    }

    const handleDeleteTodo = async (id: Id<"todos">) => {
        Alert.alert("Delete Todo", "Are you sure you want to delete this todo?", [
            {
                text: "Cancel",
                style: "cancel"
            },
            {
                text: "Delete",
                style: "destructive",
                onPress: () => deleteTodo({id})
            },
        ]);
    }

    const handleEditTodo = (todo: Todo) => {
        setEditText(todo.text)
        setEditingId(todo._id)
    }

    const handleSaveEdit = async (id: Id<"todos">) => {
        if (editingId) {
            try {
                await updateTodo({id: editingId, text: editText.trim()});
                setEditingId(null)
                setEditText("")

            } catch (error) {
                console.log("Error saving edit", error);
                Alert.alert("Error", "Failed to save edit")
            }
        }
    }

    const handleCancelEdit = async (id: Id<"todos">) => {
        setEditingId(null)
        setEditText("")
    }

    const renderTodoItem = ({item}: { item: Todo }) => {
        const isEditing = editingId === item._id;
        return (
            <View style={homeStyles.todoItemWrapper}>
                <LinearGradient
                    colors={colors.gradients.surface}
                    style={homeStyles.todoItem}
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 1}}
                >
                    <TouchableOpacity
                        style={homeStyles.checkbox}
                        activeOpacity={0.7}
                        onPress={() => handleToggleTodo(item._id)}
                    >
                        <LinearGradient
                            colors={item.isCompleted ? colors.gradients.success : colors.gradients.muted}
                            style={[homeStyles.checkboxInner, {borderColor: item.isCompleted ? "transparent" : colors.border}]}
                        >
                            {item.isCompleted && <Ionicons name={"checkmark"} size={18} color={"white"}/>}
                        </LinearGradient>
                    </TouchableOpacity>

                    {isEditing ? (
                        <View style={homeStyles.editContainer}>
                            <TextInput
                                style={homeStyles.editInput}
                                value={editText}
                                onChangeText={setEditText}
                                autoFocus
                                multiline
                                placeholder={"Edit your todo..."}
                                placeholderTextColor={colors.textMuted}
                            />
                            <View style={homeStyles.editButtons}>
                                <TouchableOpacity onPress={handleSaveEdit} activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.success} style={homeStyles.editButton}>
                                        <Ionicons name={"checkmark"} size={16} color={"white"} />
                                        <Text style={homeStyles.editButtonText}>Save</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={handleCancelEdit} activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.muted} style={homeStyles.editButton}>
                                        <Ionicons name={"close"} size={16} color={"white"} />
                                        <Text style={homeStyles.editButtonText}>Cancel</Text>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>
                    ) : (
                        <View style={homeStyles.todoTextContainer}>
                            <Text
                                style={[
                                    homeStyles.todoText,
                                    item.isCompleted && {
                                        textDecorationLine: "line-through",
                                        color: colors.textMuted,
                                        opacity: 0.6
                                    },
                                ]}
                            >{item.text}
                            </Text>
                            <View style={homeStyles.todoActions}>
                                <TouchableOpacity onPress={() => handleEditTodo(item)} activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.warning} style={homeStyles.actionButton}>
                                        <Ionicons name={"pencil"} size={14} color={"white"}/>
                                    </LinearGradient>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={() => handleDeleteTodo(item._id)} activeOpacity={0.8}>
                                    <LinearGradient colors={colors.gradients.danger} style={homeStyles.actionButton}>
                                        <Ionicons name={"trash"} size={14} color={"white"}/>
                                    </LinearGradient>
                                </TouchableOpacity>
                            </View>
                        </View>

                    )
                    }
                </LinearGradient>
            </View>
        )
    }

    return (
        <LinearGradient colors={colors.gradients.background} style={homeStyles.container}>
            <StatusBar style={colors.statusBarStyle}/>
            <SafeAreaView style={homeStyles.safeArea}>
                <Header/>
                <TodoInput/>
                <FlatList
                    data={todos}
                    renderItem={renderTodoItem}
                    keyExtractor={(item) => item._id}
                    style={homeStyles.todoList}
                    contentContainerStyle={homeStyles.todoListContent}
                    ListEmptyComponent={<EmptyState/>}
                    showsVerticalScrollIndicator={false}
                />
            </SafeAreaView>
        </LinearGradient>
    );
}
